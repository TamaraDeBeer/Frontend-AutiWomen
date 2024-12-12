import styles from './ForumPostLong.module.css';
import likes1 from "../../assets/logo/likes1.png";
import likes2 from "../../assets/logo/likes2.png";
import comments1 from "../../assets/logo/comments.png";
import view2 from "../../assets/logo/view2.png";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import EditForum from "../forumEdit/EditForum.jsx";
import DeleteForum from "../forumEdit/DeleteForum.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";
import axiosPublic from "../../helpers/axiosPublic.jsx";

function ForumPostLong({
                           title,
                           image,
                           name,
                           age,
                           date,
                           lastReaction,
                           text,
                           likesCount,
                           commentsCount,
                           viewsCount,
                           currentUser,
                           fetchForumById,
                           scrollToCommentForm
                       }) {
    const {forumId} = useParams();
    const [hasLiked, setHasLiked] = useState(false);
    const [hasViewed, setHasViewed] = useState(false);
    const [currentLikesCount, setCurrentLikesCount] = useState(likesCount);
    const [currentViewsCount, setCurrentViewsCount] = useState(viewsCount);
    const [username, setUsername] = useState('');
    const [activeForm, setActiveForm] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setUsername(username);
            checkUserLike(username);
            if (!hasViewed) {
                checkUserView(username);
            }
        }
        fetchLikeCount();
        fetchViewCount();
    }, [forumId]);

    useEffect(() => {
        setCurrentLikesCount(likesCount);
        setCurrentViewsCount(viewsCount);
    }, [likesCount]);

    async function checkUserLike(username) {
        try {
            const response = await axiosHeader.get(`/likes/check/forums/${forumId}/users/${username}`);
            setHasLiked(response.data);
        } catch (e) {
            if (e.response && e.response.status === 409) {
                setHasLiked(true);
            } else {
                console.error(e);
            }
        }
    }

    async function fetchLikeCount() {
        try {
            const response = await axiosPublic.get(`/likes/count/forums/${forumId}`);
            setCurrentLikesCount(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function addLike() {
        try {
            const response = await axiosHeader.post(`/likes/add/forums/${forumId}/users/${username}`);
            setCurrentLikesCount(response.data);
            setHasLiked(true);
            fetchLikeCount();
        } catch (e) {
            console.error(e);
        }
    }

    async function removeLike() {
        try {
            const response = await axiosHeader.delete(`/likes/delete/forums/${forumId}/users/${username}`);
            setCurrentLikesCount(response.data);
            setHasLiked(false);
            fetchLikeCount();
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchViewCount() {
        try {
            const response = await axiosPublic.get(`/views/count/forums/${forumId}`);
            setCurrentViewsCount(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function checkUserView(username) {
        try {
            const response = await axiosHeader.get(`/views/check/forums/${forumId}/users/${username}`);
            if (!response.data) {
                await addView(username);
            }
            setHasViewed(response.data);
        } catch (e) {
            if (e.response && e.response.status === 409) {
                setHasViewed(true);
            } else {
                console.error(e);
            }
        }
    }

    async function addView(username) {
        try {
            const response = await axiosHeader.post(`/views/add/forums/${forumId}/users/${username}`);
            setCurrentViewsCount(response.data);
            setHasViewed(true);
        } catch (e) {
            if (e.response && e.response.status === 409) {
                setHasViewed(true);
            } else {
                console.error(e);
            }
        }
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
                         onClick={hasLiked ? removeLike : addLike}
                    />{currentLikesCount}
                </p>

                <p className={styles['card-information__logo']}><img src={comments1}
                                                                     alt="Comments Logo"
                                                                     className={styles['logo']}
                                                                     onClick={scrollToCommentForm}/>{commentsCount}</p>
                <p className={styles['card-information__logo']}><img src={view2}
                                                                     alt="Views Logo"
                                                                     className={styles['logo-view']}/>{currentViewsCount}
                </p>
            </div>

            {currentUser === name && (
                <div className={styles['forum-actions']}>
                    <button type="button" onClick={() => setActiveForm('edit')}
                            className={`${styles['button']} ${styles['button-left']}`}>Bewerken
                    </button>
                    <button type="button" onClick={() => setActiveForm('delete')}
                            className={`${styles['button']} ${styles['button-right']}`}>Verwijderen
                    </button>
                </div>
            )}

            {activeForm === 'edit' && (
                <EditForum forumId={forumId} username={username} forumData={{title, text}} onUpdate={() => {
                    fetchForumById();
                    setTimeout(() => setActiveForm(null), 2000);
                }}/>
            )}

            {activeForm === 'delete' && (
                <DeleteForum forumId={forumId} username={username} onDelete={() => setActiveForm(null)}/>
            )}

        </article>
    </>);
}

export default ForumPostLong;