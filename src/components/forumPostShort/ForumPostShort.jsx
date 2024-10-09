import styles from './ForumPostShort.module.css';
import likes1 from "../../assets/logo/likes.png";
import comments1 from "../../assets/logo/comments.png";
import views1 from "../../assets/logo/views.png";
import {Link} from "react-router-dom";


// eslint-disable-next-line react/prop-types
function ForumPostShort({image, name, age, title, date, text, link, likesCount, commentsCount, viewsCount, lastReaction}) {
    return (
        <article className={styles['section-forum__card']}>
            <span>
                <img className={styles['image']} src={image} alt={name}/>
            </span>
            <div className={styles['section-forum__card-information']}>
                <h4 className={styles['card-information__text']}>{name} ({age}) datum: {date}</h4>
                <p className={styles['card-information__title']}>{title}</p>
                <p className={styles['card-information__text']}>{text} <Link className={styles['card-information__link']} to={link}> ... lees meer </Link> </p>
                {/*lees meer wordt een link naar de specifieke post*/}
                <div className={styles['card-information__logo-section']}>
                    <p className={styles['card-information__logo']}><img src={likes1} alt="Likes Logo"/>{likesCount}</p>
                    <p className={styles['card-information__logo']}><img src={comments1} alt="Comments Logo"/>{commentsCount}</p>
                    <p className={styles['card-information__logo']}><img src={views1} alt="Views Logo"/>{viewsCount}</p>
                </div>
                <p className={styles['card-information__reaction']}>Laatste reactie: {lastReaction}</p>
            </div>
        </article>
    );
}

export default ForumPostShort;