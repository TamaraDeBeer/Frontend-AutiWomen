import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ForumEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function DeleteForum({forumId, onDelete}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/forums/${forumId}`);
            setIsSubmitted(true);
            onDelete();
            setTimeout(() => navigate('/profile'), 500);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Forum Verwijdert!</p>
                </div>
            ) : (
                <div>
                    <Button type="button" onClick={handleDelete} variant="secondary">Bevestig Verwijderen</Button>
                    {error && <ErrorMessage message={error}/>}
                </div>
            )}
        </div>
    );
}

export default DeleteForum;