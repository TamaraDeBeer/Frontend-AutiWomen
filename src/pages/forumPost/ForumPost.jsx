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
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import RelatedForums from "../../components/relatedForums/RelatedForums.jsx";

function ForumPost() {
    const {forumId} = useParams();
    const navigate = useNavigate();
    const [errorById, toggleErrorById] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);

    // const CommentsList = ({ forumId }) => {
    //     const [commentsByForumId, setCommentsByForumId] = useState([]);

    const [commentsByForumId, setCommentsByForumId] = useState([]);


    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [postComment, setPostComment] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [name, setName] = useState('');
    const [lastReaction, setLastReaction] = useState('');
    // const [hasLiked, setHasLiked] = useState(false);
    // const [likesCount, setLikesCount] = useState('');
    // const [error, toggleError] = useState(false);


    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setName(username);
        }
        if (forumId) {
            fetchForumById();
            fetchCommentsByForumId();
        }
    }, [forumId]);

    useEffect(() => {
        if (forumById.lastReaction) {
            setLastReaction(createDateToString(forumById.lastReaction));
        }
    }, [forumById]);


    async function fetchForumById() {
        toggleErrorById(false);
        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${forumId}`);
            setForumById(response.data);
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
            const response = await axios.get(`http://localhost:1991/forums/${forumId}/comments`);
            setCommentsByForumId(response.data);
            console.log("comments:" + JSON.stringify(response.data));
        } catch (e) {
            console.error(e);
            toggleErrorById(true);
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
            fetchCommentsByForumId();
            setCommentText('');
            setLastReaction(createDateToString(new Date().toISOString()));
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
                            lastReaction={lastReaction}
                            text={forumById.text}
                            likesCount={forumById.likesCount}
                            commentsCount={forumById.commentsCount}
                            viewsCount={forumById.viewsCount}
                        />
                    }

                    <div className={styles['section-forum__line']}></div>

                    <section>
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
                        {errorById && <ErrorMessage
                            message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
                    </section>

                    {/*<section>*/}
                    {/*    {commentsByForumId.length > 0 ? (*/}
                    {/*        (() => {*/}
                    {/*            const commentComponents = [];*/}
                    {/*            for (let i = 0; i < commentsByForumId.length; i++) {*/}
                    {/*                const comment = commentsByForumId[i];*/}
                    {/*                commentComponents.push(*/}
                    {/*                    <CommentForum*/}
                    {/*                        key={comment.id}*/}
                    {/*                        image={comment.user?.profilePictureUrl}*/}
                    {/*                        name={comment.name}*/}
                    {/*                        age={calculateAge(comment.user.dob)}*/}
                    {/*                        date={createDateToString(comment.date)}*/}
                    {/*                        text={comment.text}*/}
                    {/*                    />*/}
                    {/*                );*/}
                    {/*            }*/}
                    {/*            return commentComponents;*/}
                    {/*        })()*/}
                    {/*    ) : (*/}
                    {/*        <p>Nog geen opmerkingen, plaats een eerste opmerking hieronder</p>*/}
                    {/*    )}*/}
                    {/*    {errorById && <ErrorMessage*/}
                    {/*        message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}*/}
                    {/*</section>*/}

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