import styles from "../forumCreate/ForumCreate.module.css";
import Button from "../../components/button/Button.jsx";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


function ForumCreate() {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [topic, setTopic] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [likes, setLikes] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [comments, setComments] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [views, setViews] = useState(0);
    const navigate = useNavigate();

    async function addForum(e) {
        e.preventDefault();
        console.log(name, title, text, topic);

        try {
            const response = await axios.post('http://localhost:1991/forums', {
                name: name,
                title: title,
                text: text,
                topic: topic,
                // likes: setLikes(0),
                // comments: setComments(0),
                // views: setViews(0),
            });
            console.log(response.data);
            navigate(`/forum/${response.data.id}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (<>

            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Deel je problemen, geef advies en wees respectvol</h2>
                </div>
            </section>

            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-post__inner-container']}`}>
                    <form onSubmit={addForum} className={styles['forum-form']}>

                        <label htmlFor="name">Naam:
                            <input type="text"
                                   name="name"
                                   id="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                            />
                        </label>

                        <label htmlFor="name">Titel:
                            <input type="text"
                                   name="title"
                                   id="title"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>

                        <label htmlFor="text-field" className={styles['forum-form__textarea']}> Tekst:
                            <textarea
                                name="forum-text"
                                id="forum-text"
                                cols="60"
                                rows="10"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>

                        </label>


                        <label htmlFor="topic" className={styles['forum-form__topic']}> Selecteer het bijpassende onderwerp:
                            <select className={styles['forum-form__topic-select']}
                                    id="topic"
                                    name="topic"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}>
                                <option value="" disabled selected>-- Selecteer een onderwerp --</option>
                                <option value="fysiek">Fysieke Gezondheid</option>
                                <option value="mentaal">Mentale Gezondheid</option>
                                <option value="structuur">Structuur</option>
                                <option value="werk">Werk</option>
                                <option value="relaties">Relaties</option>
                                <option value="school">School</option>
                                <option value="huishouden">Huishouden</option>
                                <option value="vriendschappen">Vriendschappen</option>
                                <option value="rouw">Rouw</option>
                                <option value="overig">Overig</option>
                            </select>
                        </label>


                        <div className={styles['forum-form__buttons']}>
                            <Button type="reset">Annuleren</Button>
                            <Button type="submit">Verstuur</Button>
                        </div>

                    </form>


                </div>
            </section>


        </>

    );
}

export default ForumCreate;
