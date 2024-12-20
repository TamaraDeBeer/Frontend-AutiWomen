import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import CommentForum from "../../components/commentForum/CommentForum.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";
import RelatedForums from "../../components/relatedForums/RelatedForums.jsx";
import UserForums from "../../components/userForums/UserForums.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";
import axiosPublic from "../../helpers/axiosPublic.jsx";

function ForumPost() {
    const {forumId} = useParams();
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);
    const [commentsByForumId, setCommentsByForumId] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [lastReaction, setLastReaction] = useState('');
    const commentFormRef = useRef(null);
    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        if (forumId) {
            fetchForumById();
        }
        if (forumById.id) {
            setCommentsCount(forumById.commentsCount);
            fetchCommentsByForumId();
        }
        if (forumById.lastReaction) {
            setLastReaction(createDateToString(forumById.lastReaction));
        }
    }, [forumId]);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function fetchForumById() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const response = await axiosPublic.get(`/forums/${forumId}`, {signal});
            setForumById(response.data);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    async function fetchCommentsByForumId() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const response = await axiosPublic.get(`/comments/forums/${forumId}`, {signal});
            const sortedComments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setCommentsByForumId(sortedComments);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
            if (e.response && e.response.status === 404) {
                setCommentsByForumId([]);
            } else {
                console.error(e);
                toggleError(true);
            }
        }
        toggleLoading(false);
    }

    async function addComment(e) {
        e.preventDefault();
        const username = localStorage.getItem('username');
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            await axiosHeader.post(`/comments/forums/${forumId}/users/${username}`, {
                name: username,
                text: commentText,
                date: new Date().toISOString(),
                signal
            });
            fetchCommentsByForumId();
            setCommentText('');
            setLastReaction(createDateToString(new Date().toISOString()));
            setCommentsCount(prevCount => prevCount + 1);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    const scrollToCommentForm = () => {
        if (commentFormRef.current) {
            commentFormRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <>
            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Deel je problemen, geef advies en wees respectvol</h2>
                    <div>
                        <Button type="button" className={styles['button-forum']}
                                onClick={() => navigate('/forum/create')}
                        >Schrijf een forum</Button>
                    </div>
                </div>
            </section>

            <section className={`${styles['outer-container']} ${styles['section-forum__main']}`}>
                <section className={styles['section-forum__posts-long']}>
                    {error &&
                        <p className="error-message">Er ging iets mis, probeer het later opnieuw.</p>}
                    {loading && <p>Laden...</p>}

                    {Object.keys(forumById).length > 0 && (
                        <ForumPostLong
                            title={forumById.title}
                            image={forumById.userDto?.profilePictureUrl}
                            name={forumById.name}
                            age={calculateAge(forumById.dob) + ' jaar'}
                            date={createDateToString(forumById.date)}
                            lastReaction={lastReaction ? lastReaction : 'Plaats de eerste reactie hieronder'}
                            text={forumById.text}
                            likesCount={forumById.likesCount}
                            commentsCount={commentsCount}
                            viewsCount={forumById.viewsCount}
                            currentUser={localStorage.getItem('username')}
                            fetchForumById={fetchForumById}
                            scrollToCommentForm={scrollToCommentForm}
                        />
                    )}

                    <div className={styles['section-forum__line']}></div>

                    <section className={styles['section-response']}>
                        {error && <p className="error-message">Er ging iets mis, probeer het later opnieuw.</p>}
                        {loading && <p>Laden...</p>}

                        {commentsByForumId.length > 0 ? (
                            commentsByForumId.map(comment => (
                                <CommentForum
                                    key={comment.id}
                                    image={comment.userDto?.profilePictureUrl}
                                    name={comment.name}
                                    age={calculateAge(comment.dob) + ' jaar'}
                                    date={createDateToString(comment.date)}
                                    text={comment.text}
                                    commentId={comment.id}
                                    forumId={forumId}
                                    currentUser={localStorage.getItem('username')}
                                    username={comment.name}
                                    fetchCommentsByForumId={fetchCommentsByForumId}
                                />
                            ))
                        ) : (
                            !loading && !error && <p>Er zijn nog geen opmerkingen.</p>
                        )}
                    </section>

                    <div className={styles['section-forum__line']}></div>

                    <div className={styles['section-forum__comment']} ref={commentFormRef}>
                        {localStorage.getItem('username') ? (
                            <>
                                <h3 className={styles['section-forum__comment-reactie']}>Jouw Reactie:</h3>
                                <form onSubmit={addComment} className={styles['section-forum__comment-card']}>
                                    <label htmlFor="name">Naam:
                                        <input type="text"
                                               name="name"
                                               id="name"
                                               value={localStorage.getItem('username')}
                                               readOnly
                                        />
                                    </label>

                                    <label htmlFor="text-field"> Tekst:
                                        <textarea
                                            name="forum-text"
                                            id="forum-text"
                                            cols="60"
                                            rows="10"
                                            value={commentText}
                                            onChange={(e) => setCommentText(e.target.value)}
                                        ></textarea>
                                    </label>

                                    <div className={styles['section-forum__comment-button']}>
                                        <Button type="reset">Annuleren</Button>
                                        <Button type="submit">Verstuur</Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <p>Je moet ingelogd zijn om een opmerking te kunnen toevoegen.</p>
                        )}
                    </div>
                </section>

                <section className={styles['section-forum__sidebar']}>
                    <PopulairTopics/>
                    <RelatedForums topic={forumById.topic} currentForumId={forumById.id}/>
                    <UserForums username={forumById.name} currentForumId={forumById.id}/>
                </section>
            </section>
        </>
    );
}

export default ForumPost;