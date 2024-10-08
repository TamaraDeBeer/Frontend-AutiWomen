import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import elsa from "../../assets/profilePhoto/elsa.jpg";
import {useEffect, useState} from "react";
import axios from "axios";
import createDateToString from "../../helpers/createDateToString.jsx";
// import likes2 from "../../assets/logo/likes2.png";
import CommentForum from "../../components/commentForum/CommentForum.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";

function ForumPost() {
    const {id, username, forumId} = useParams();
    const navigate = useNavigate();
    const [errorById, toggleErrorById] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState();

    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [commentDate, setCommentDate] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [postComment, setPostComment] = useState([]);

    useEffect(() => {
        void fetchForumById();
    }, [id]);

    async function fetchForumById() {
        toggleErrorById(false);

        try {
            toggleLoading(true);
            const response = await axios.get(`http://localhost:1991/forums/${id}`);
            setForumById(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
            toggleErrorById(true);
        }
        toggleLoading(false);
    }

    // async function addLike() {
    //     try {
    //         const response = await axios.put(`http://localhost:1991/forums/${id}/like`, {
    //             likes: forumById.likes,
    //         });
    //         setForumById(response.data);
    //         console.log(response.data);
    //         setImage(likes2);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    async function addComment(e) {
        e.preventDefault();
        console.log(commentName, commentText, commentDate);

        try {
            const response = await axios.post(`http://localhost:1991/forums/${forumId}/comments/${username}`, {
                name: commentName,
                text: commentText,
                date: new Date().toISOString(),
                // age:
                // image:
            });
            setPostComment(response.data);
            console.log(response.data);
            // navigate(`/forum/${response.data.id}`);
        } catch (e) {
            console.log(e);
        }
    }

    return (<>

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
                        image={elsa}
                        name={forumById.name}
                        age={calculateAge(forumById.age)}
                        date={createDateToString(forumById.date)}
                        lastReaction={forumById.lastReaction}
                        text={forumById.text}
                        // buttonLike={addLike}
                        likes={forumById.likes}
                        comments={forumById.comments}
                        views={forumById.views}
                    />
                }

                <div className={styles['section-forum__line']}></div>

                {/*<h3>slider nieuwste / trending</h3>*/}

                <CommentForum
                    image={elsa}
                    name="Jane"
                    age="23 jaar"
                    date="10 uur gelden"
                    text="Oef ik snap je uitdaging. Soms lukt het mij heel goed en soms totaal niet. Heb je een slaapritueel? Bij mij gaat, heel streng, om 22.00 uur de TV uit en mobiel weg. In stilte nog even bijkomen van de dag en dan rond 23.00 uur lekker naar bed."
                />


                <div className={styles['section-forum__line']}></div>

                <div className={styles['section-forum__comment']}>
                    <h3 className={styles['section-forum__comment-reactie']}>Jouw Reactie:</h3>

                    <form onSubmit={addComment} className={styles['section-forum__comment-card']}>
                        <label htmlFor="name">Naam:
                            <input type="text"
                                   name="name"
                                   id="name"
                                   value={commentName}
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


    </>);
}

export default ForumPost;