import {useState} from "react";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import styles from "../forumEdit/ForumEdit.module.css";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function DeleteComment({username, commentId, onDelete, fetchCommentsByForumId}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleDelete() {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/comments/${commentId}/users/${username}`);
            setIsSubmitted(true);
            onDelete();
            setTimeout(() => {
                fetchCommentsByForumId();
            }, 250);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-comment']}>
                    <p>Comment Verwijdert!</p>
                </div>
            ) : (
                <div>
                    <Button type="submit" onClick={handleDelete} variant="secondary">Bevestig Verwijderen</Button>
                    {loading && <p>Laden...</p>}
                    {error && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."}/>}
                </div>
            )}
        </div>
    )

}

export default DeleteComment;