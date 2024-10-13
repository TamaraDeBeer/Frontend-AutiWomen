import styles from './CommentForum.module.css';
import EditComment from "../commentEdit/EditComment.jsx";
import DeleteComment from "../commentEdit/DeleteComment.jsx";
import {useState} from "react";

function CommentForum({image, name, age, date, text, commentId, currentUser, forumId, fetchCommentsByForumId}) {
    const [activeForm, setActiveForm] = useState(null);

    return (

        <article className={styles['section-comment__card']}>
            <div className={styles['comment-content']}>
            <span>
                <img className={styles['image']} src={image} alt={name}/>
            </span>

                <section className={styles['section-comment__card-information']}>
                    <div className={styles['section-comment__card-persona']}>
                        <h3 className={styles['card-persona__name']}>{name} ({age})</h3>
                        <h4 className={styles['card-persona__date']}>{date}</h4>
                    </div>

                    <p className={styles['section-comment__text']}>{text}</p>

                </section>
            </div>

            {currentUser === name && (
                <div className={styles['forum-actions']}>
                    <button type="button" onClick={() => setActiveForm('edit')} className={`${styles['button']} ${styles['button-left']}`}>Bewerken</button>
                    <button type="button" onClick={() => setActiveForm('delete')} className={`${styles['button']} ${styles['button-right']}`}>Verwijderen</button>
                </div>
            )}

            {activeForm === 'edit' && (
                <EditComment forumId={forumId}  commentId={commentId} commentData={{ text }} onUpdate={() => { fetchCommentsByForumId(); setTimeout(() => setActiveForm(null), 2000); }} />
            )}

            {activeForm === 'delete' && (
                <DeleteComment forumId={forumId} commentId={commentId} onDelete={() => { setActiveForm(null); setTimeout(() => setActiveForm(null), 2000); }} fetchCommentsByForumId={fetchCommentsByForumId} />
            )}


            <div className={styles['comment-divider']}></div>
        </article>

    );
}

export default CommentForum;