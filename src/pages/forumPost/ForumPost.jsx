import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import elsa from "../../assets/profilePhoto/elsa.jpg";
import {useEffect, useState} from "react";
import axios from "axios";
import createDateToString from "../../helpers/createDateToString.jsx";
import likes2 from "../../assets/logo/likes2.png";

function ForumPost() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [errorById, toggleErrorById] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [forumById, setForumById] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState();

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

    async function addLike() {
        try {
            const response = await axios.put(`http://localhost:1991/forums/${id}/like`, {
                likes: forumById.likes,
            });
            setForumById(response.data);
            console.log(response.data);
            setImage(likes2);
        } catch (e) {
            console.error(e);
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
                        age={forumById.age}
                        date={createDateToString(forumById.date)}
                        lastReaction={forumById.lastReaction}
                        text={forumById.text}
                        buttonLike={addLike}
                        likes={forumById.likes}
                        comments={forumById.comments}
                        views={forumById.views}
                    />
                }


                <div className={styles['section-forum__line']}></div>

                <h3>slider nieuwste / trending</h3>

                <p>REACTIES</p>

                <h4>POST REACTIE</h4>


            </section>

            <section className={styles['section-forum__sidebar']}>
                <h2>Component Populaire onderwerpen</h2>
            </section>

        </section>


    </>);
}

export default ForumPost;