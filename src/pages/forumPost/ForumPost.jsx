import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import CommentForum from "../../components/commentForum/CommentForum.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";
// import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import RelatedForums from "../../components/relatedForums/RelatedForums.jsx";

function ForumPost() {
    const {forumId} = useParams();
    const navigate = useNavigate();
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);
    const [commentsByForumId, setCommentsByForumId] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [postComment, setPostComment] = useState([]);
    const [name, setName] = useState('');
    const [lastReaction, setLastReaction] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setName(username);
        }
        if (forumId) {
            fetchForumById();
        }
    }, [forumId]);

    useEffect(() => {
        if (forumById.id) {
            fetchCommentsByForumId();
        }
        if (forumById.lastReaction) {
            setLastReaction(createDateToString(forumById.lastReaction));
        }
    }, [forumById]);

    async function fetchForumById() {
        toggleError(false);
        toggleLoading(true);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}`);
            setForumById(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchCommentsByForumId() {
        toggleError(false);
        toggleLoading(true);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/comments`);
            const sortedComments = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setCommentsByForumId(sortedComments);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function addComment(e) {
        e.preventDefault();
        const username = localStorage.getItem('username');
        toggleError(false);
        toggleLoading(true);
        try {
            toggleLoading(true);
            const response = await axios.post(`http://localhost:1991/forums/${forumId}/comments/${username}`, {
                name: username,
                text: commentText,
                date: new Date().toISOString(),
            });
            setPostComment(response.data);
            fetchCommentsByForumId();
            setCommentText('');
            setLastReaction(createDateToString(new Date().toISOString()));
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

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
                    {error && <p className="error-message">Deze forum post bestaat niet (meer).</p>}
                    {loading && <p>Loading...</p>}

                    {Object.keys(forumById).length > 0 && (
                        <ForumPostLong
                            title={forumById.title}
                            image={forumById.userDto?.profilePictureUrl}
                            name={forumById.name}
                            age={calculateAge(forumById.age)}
                            date={createDateToString(forumById.date)}
                            lastReaction={lastReaction ? lastReaction : 'Plaast de eerste reactie hieronder'}
                            text={forumById.text}
                            likesCount={forumById.likesCount}
                            commentsCount={forumById.commentsCount}
                            viewsCount={forumById.viewsCount}
                            currentUser={name}
                            fetchForumById={fetchForumById}
                        />
                        )}

                    <div className={styles['section-forum__line']}></div>

                    <section className={styles['section-response']}>
                            {error && <p className="error-message">Data ophalen lukt niet, probeer het later nog een keer.</p>}
                            {loading && <p>Loading...</p>}

                            {commentsByForumId.length > 0 && commentsByForumId.map(comment => (
                                <CommentForum
                                    key={comment.id}
                                    image={comment.userDto?.profilePictureUrl}
                                    name={comment.name}
                                    age={calculateAge(comment.age)}
                                    date={createDateToString(comment.date)}
                                    text={comment.text}
                                    commentId={comment.id}
                                    forumId={forumId}
                                    currentUser={name}
                                    fetchCommentsByForumId={fetchCommentsByForumId}
                                />
                            ))}
                    </section>

                    <div className={styles['section-forum__line']}></div>

                    <div className={styles['section-forum__comment']}>
                        <h3 className={styles['section-forum__comment-reactie']}>Jouw Reactie:</h3>

                        <form onSubmit={addComment} className={styles['section-forum__comment-card']}>
                            <label htmlFor="name">Naam:
                                <input type="text"
                                       name="name"
                                       id="name"
                                       value={name}
                                       onChange={(e) => setCommentName(e.target.value)}
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
                    </div>
                </section>

                <section className={styles['section-forum__sidebar']}>
                    <PopulairTopics/>
                    <RelatedForums topic={forumById.topic} currentForumId={forumById.id}/>
                </section>
            </section>
        </>
    );
}

export default ForumPost;