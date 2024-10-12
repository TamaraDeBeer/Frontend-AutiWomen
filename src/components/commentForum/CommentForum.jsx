import styles from './CommentForum.module.css';

function CommentForum({image, name, age, date, text}) {

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

            <div className={styles['comment-divider']}></div>
        </article>

    );
}

export default CommentForum;