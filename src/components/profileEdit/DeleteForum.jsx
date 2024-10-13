import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ProfileEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function DeleteForum({forumId, onDelete}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:1991/forums/${forumId}`);
            setIsSubmitted(true);
            onDelete();
            setTimeout(() => navigate('/forums'), 2000);
        } catch (e) {
            console.error(e);
            toggleError('Verwijderen niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <div>
                    <Button type="button" onClick={handleDelete}>Delete</Button>
                    {error && <ErrorMessage message={error}/>}
                </div>
            )}
        </div>
    );
}

export default DeleteForum;