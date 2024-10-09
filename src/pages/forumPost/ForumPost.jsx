import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import CommentForum from "../../components/commentForum/CommentForum.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";

function ForumPost() {
    const {forumId} = useParams();
    const navigate = useNavigate();
    const [errorById, toggleErrorById] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);
    const [commentsByForumId, setCommentsByForumId] = useState([]);
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [postComment, setPostComment] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setName(username);
        }

        console.log('useParams:', { forumId }); // Debugging line
        if (forumId) {
            fetchForumById();
            fetchCommentsByForumId();
        }
    }, [forumId]);
    async function fetchForumById() {
        toggleErrorById(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}`);
            setForumById(response.data);
            console.log('Forum data:', response.data); // Debugging line
        } catch (e) {
            console.error(e);
            toggleErrorById(true);
        }
        toggleLoading(false);
    }

    async function fetchCommentsByForumId() {
        toggleErrorById(false);
        try {
            toggleLoading(true);
            console.log('Fetching comments for forumId:', forumId); // Debugging line
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/comments`);
            console.log('API response:', response.data);
            setCommentsByForumId(response.data);
            console.log('Updated comments state:', response.data); // Debugging line
        } catch (e) {
            console.error(e);
        }
        toggleLoading(false);
    }

    async function addComment(e) {
        e.preventDefault();
        const username = localStorage.getItem('username');
        console.log(commentName, commentText);

        try {
            const response = await axios.post(`http://localhost:1991/forums/${forumId}/comments/${username}`, {
                name: username,
                text: commentText,
                date: new Date().toISOString(),
            });
            setPostComment(response.data);
            console.log(response.data);
            fetchCommentsByForumId(); // Refresh comments after adding a new one
        } catch (e) {
            console.error(e);
        }
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
                    {errorById && <p className="error-message">Deze forum post bestaat niet (meer).</p>}
                    {loading && <p>Loading...</p>}

                    {Object.keys(forumById).length > 0 &&
                        <ForumPostLong
                            title={forumById.title}
                            image={forumById.userDto?.profilePictureUrl}
                            name={forumById.name}
                            age={calculateAge(forumById.age)}
                            date={createDateToString(forumById.date)}
                            lastReaction={forumById.lastReaction}
                            text={forumById.text}
                            likes={forumById.likes}
                            comments={forumById.comments}
                            views={forumById.views}
                        />
                    }

                    <div className={styles['section-forum__line']}></div>

                    {commentsByForumId.length > 0 ? (
                        commentsByForumId.map((comment) => (
                            <CommentForum
                                key={comment.id}
                                image={comment.user?.profilePictureUrl}
                                name={comment.name}
                                age={calculateAge(comment.user.dob)}
                                date={createDateToString(comment.date)}
                                text={comment.text}
                            />
                        ))
                    ) : (
                        <p>Nog geen opmerkingen, plaats een eerste opmerking hieronder</p>
                    )}

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
                </section>
            </section>
        </>
    );
}

export default ForumPost;