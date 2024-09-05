import styles from './ForumPostLong.module.css';
import likes1 from "../../assets/logo/likes.png";
import comments1 from "../../assets/logo/comments.png";
import views1 from "../../assets/logo/views.png";


// eslint-disable-next-line react/prop-types
function ForumPostLong({title, image, name, age, date, lastReaction, text, buttonLike, likes, comments, views}) {
    return (<>
        <article className={styles['section-forum__card']}>
            <h2 className={styles['card-information__title']}>{title}</h2>

            <div className={styles['section-forum__main']}>
            <span>
                <img src={image} alt={name}/>
            </span>

                <div className={styles['section-forum__card-information']}>

                    <div>
                        <h1 className={styles['card-information__name']}>{name} ({age})</h1>
                        <h4 className={styles['card-information__date']}>Geplaatst op: {date}</h4>
                        <p className={styles['card-information__reaction']}>Laatste reactie: {lastReaction}</p>
                    </div>

                    <p className={styles['card-information__text']}>{text}</p>
                </div>
            </div>

            <div className={styles['card-information__logo-section']}>
                <p className={styles['card-information__logo']}><img src={likes1} alt="Likes Logo"
                                                                     onClick={buttonLike}/>{likes}</p>
                <p className={styles['card-information__logo']}><img src={comments1} alt="Comments Logo"/>{comments}</p>
                <p className={styles['card-information__logo']}><img src={views1} alt="Views Logo"/>{views}</p>
            </div>

        </article>
    </>);
}

export default ForumPostLong;