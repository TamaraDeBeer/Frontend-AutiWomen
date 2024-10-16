import styles from './ForumPostShort.module.css';
import likes1 from "../../assets/logo/likes1.png";
import likes2 from "../../assets/logo/likes2.png";
import comments1 from "../../assets/logo/comments.png";
import view1 from "../../assets/logo/view1.png";
import view2 from "../../assets/logo/view2.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function ForumPostShort({forumId, image, name, age, title, date, text, link, likesCount, commentsCount, viewsCount, lastReaction}) {
    // eslint-disable-next-line no-unused-vars
    const [username, setUsername] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [hasViewed, setHasViewed] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            checkUserLike(storedUsername);
            checkUserView(storedUsername);
        }
    }, [forumId]);

    async function checkUserLike(storedUsername) {
        try {
            const response = await axiosHeader.get(`/forums/${forumId}/users/${storedUsername}/likes/check`);
            setHasLiked(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function checkUserView(storedUsername) {
        try {
            const response = await axiosHeader.get(`/forums/${forumId}/users/${storedUsername}/views/check`);
            setHasViewed(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <article className={styles['section-forum__card']}>
            <span>
                <img className={styles['image']} src={image} alt={name}/>
            </span>
            <div className={styles['section-forum__card-information']}>
                <h4 className={styles['card-information__text']}>{name} ({age}) datum: {date}</h4>
                <p className={styles['card-information__title']}>{title}</p>
                <p className={styles['card-information__text']}>{text} <Link
                    className={styles['card-information__link']} to={link}> ... lees meer </Link></p>
                <div className={styles['card-information__logo-section']}>
                    <p className={styles['card-information__logo']}><img src={hasLiked ? likes2 : likes1}
                                                                         className={styles['logo-like']}
                                                                         alt="Likes Logo"/>{likesCount}</p>
                    <p className={styles['card-information__logo']}><img src={comments1}
                                                                         alt="Comments Logo"/>{commentsCount}</p>
                    <p className={styles['card-information__logo']}><img src={hasViewed ? view2 : view1}
                                                                         className={styles['logo-view']}
                                                                         alt="Views Logo"/>{viewsCount}</p>
                </div>
                <p className={styles['card-information__reaction']}>Laatste reactie: {lastReaction}</p>
            </div>
        </article>
    );
}

export default ForumPostShort;