import styles from './ForumPostShort.module.css';
import likes1 from "../../assets/logo/likes.png";
import comments1 from "../../assets/logo/comments.png";
import views1 from "../../assets/logo/views.png";


// eslint-disable-next-line react/prop-types
function ForumPostShort({image, name, age, title, text, likes, comments, views, lastReaction}) {
    return (
        <article className={styles['section-forum__card']}>
            <div>
                <img src={image} alt={name}/>
            </div>
            <div className={styles['section-forum__card-information']}>
                <h4 className={styles['card-information__text']}>{name} ({age})</h4>
                <p className={styles['card-information__title']}>{title}</p>
                <p className={styles['card-information__text']}>{text} ... lees meer</p>
                {/*lees meer wordt een link naar de specifieke post*/}
                <div className={styles['card-information__logo-section']}>
                    <p className={styles['card-information__logo']}><img src={likes1} alt="Likes Logo"/>{likes}</p>
                    <p className={styles['card-information__logo']}><img src={comments1} alt="Comments Logo"/>{comments}</p>
                    <p className={styles['card-information__logo']}><img src={views1} alt="Views Logo"/>{views}</p>
                </div>
                <p className={styles['card-information__reaction']}>Laatste reactie: {lastReaction}</p>
            </div>
        </article>
    );
}

export default ForumPostShort;