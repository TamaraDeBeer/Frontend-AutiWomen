import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ForumEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function DeleteForum({forumId, username, onDelete}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function handleDelete() {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/forums/${forumId}/users/${username}`);
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
                    <Button type="submit" onClick={handleDelete} variant="secondary">Bevestig Verwijderen</Button>
                    {loading && <p>Laden...</p>}
                    {error && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."}/>}
                </div>
            )}
        </div>
    );
}

export default DeleteForum;