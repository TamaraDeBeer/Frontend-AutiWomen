import {useState} from "react";
import axios from "axios";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import styles from "../forumEdit/ForumEdit.module.css";

function DeleteComment({forumId, commentId, onDelete, fetchCommentsByForumId}) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:1991/forums/${forumId}/comments/${commentId}`);
            setIsSubmitted(true);
            onDelete();
            setTimeout(() => {
                fetchCommentsByForumId();
            }, 250);
        } catch (e) {
            console.error(e);
            toggleError('Verwijderen niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-comment']}>
                    <p>Comment Verwijdert!</p>
                </div>
            ) : (
                <div>
                    <Button type="button" onClick={handleDelete} variant="secondary">Bevestig Verwijderen</Button>
                    {error && <ErrorMessage message={error}/>}
                </div>
            )}
        </div>
    )

}

export default DeleteComment;