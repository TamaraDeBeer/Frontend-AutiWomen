import styles from './CommentForum.module.css';

function CommentForum({image, name, age, date, text}) {

    return (<>

        <article className={styles['section-comment__card']}>
            <span>
                <img src={image} alt={name}/>
            </span>

            <section className={styles['section-comment__card-information']}>
                <div className={styles['section-comment__card-persona']}>
                    <h3>{name} ({age})</h3>
                    <h4>{date}</h4>
                </div>

                <p>{text}</p>

            </section>

        </article>

    </>);
}

export default CommentForum;