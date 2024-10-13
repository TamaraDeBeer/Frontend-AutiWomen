import styles from './ForumPostLong.module.css';
import likes1 from "../../assets/logo/likes1.png";
import likes2 from "../../assets/logo/likes2.png";
import comments1 from "../../assets/logo/comments.png";
import view1 from "../../assets/logo/view1.png";
import view2 from "../../assets/logo/view2.png";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import EditForum from "../forumEdit/EditForum.jsx";
import DeleteForum from "../forumEdit/DeleteForum.jsx";

function ForumPostLong({title, image, name, age, date, lastReaction, text, likesCount, commentsCount, viewsCount, currentUser}) {
    const {forumId} = useParams();
    const [hasLiked, setHasLiked] = useState(false);
    const [hasViewed, setHasViewed] = useState(false);
    const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
    const [currentViewsCount, setCurrentViewsCount] = useState(viewsCount);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [activeForm, setActiveForm] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            checkUserLike(storedUsername);
            checkUserView(storedUsername);
            addView(storedUsername);
        }
        fetchLikeCount();
        fetchViewCount();
    }, [forumId]);

    useEffect(() => {
        setCurrentLikesCount(likesCount);
        setCurrentViewsCount(viewsCount);
    }, [likesCount, viewsCount]);

    async function checkUserLike(storedUsername) {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/users/${storedUsername}/likes/check`);
            setHasLiked(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchLikeCount() {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/likes/count`);
            setCurrentLikesCount(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function addLike() {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.post(`http://localhost:1991/forums/${forumId}/users/${username}/likes/add`);
            setCurrentLikesCount(response.data);
            setHasLiked(true);
            fetchLikeCount();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function removeLike() {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.delete(`http://localhost:1991/forums/${forumId}/users/${username}/likes/remove`);
            setCurrentLikesCount(response.data);
            setHasLiked(false);
            fetchLikeCount();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function checkUserView(storedUsername) {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/users/${storedUsername}/views/check`);
            setHasViewed(response.data);
            console.log(response.data);
            console.log(response);
        } catch (e) {
            console.error(e);
            console.error("Error checking user view:", e);
            toggleError(true);
        }
        toggleLoading
    }

    async function fetchViewCount() {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/views/count`);
            setCurrentViewsCount(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function addView(storedUsername) {
        toggleError(false);
        try {
            toggleLoading(true);
            const response = await axios.post(`http://localhost:1991/forums/${forumId}/users/${storedUsername}/views/add`);
            setCurrentViewsCount(response.data);
            setHasViewed(true);
            console.log(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (<>
        <article className={styles['section-forum__card']}>
            <h2 className={styles['card-information__title']}>{title}</h2>

            <div className={styles['section-forum__main']}>
            <span>
                <img src={image} className={styles['image']} alt={name}/>
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
                <p className={styles['card-information__logo']}>
                    <img src={hasLiked ? likes2 : likes1}
                         alt="Likes Logo"
                         className={styles['logo-like']}
                         onClick={hasLiked ? removeLike : addLike}/>{currentLikesCount}
                </p>
                <p className={styles['card-information__logo']}><img src={comments1}
                                                                     alt="Comments Logo"
                                                                     className={styles['logo']}/>{commentsCount}</p>
                <p className={styles['card-information__logo']}><img src={hasViewed ? view2 : view1}
                                                                     alt="Views Logo"
                                                                     className={styles['logo-view']}/>{currentViewsCount}
                </p>
            </div>

            {currentUser === name && (
                <div className={styles['forum-actions']}>
                    <button type="button" onClick={() => setActiveForm('edit')} className={`${styles['button']} ${styles['button-left']}`}>Bewerken</button>
                    <button type="button" onClick={() => setActiveForm('delete')} className={`${styles['button']} ${styles['button-right']}`}>Verwijderen</button>
                </div>
            )}

            {activeForm === 'edit' && (
                <EditForum forumId={forumId} forumData={{ title, text }} onUpdate={() => setActiveForm(null)} />
            )}

            {activeForm === 'delete' && (
                <DeleteForum forumId={forumId} onDelete={() => setActiveForm(null)} />
            )}

        </article>
    </>);
}

export default ForumPostLong;