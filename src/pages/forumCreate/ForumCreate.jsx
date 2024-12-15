import styles from "../forumCreate/ForumCreate.module.css";
import Button from "../../components/button/Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function ForumCreate() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [topic, setTopic] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function addForum(e) {
        toggleError(false);
        toggleLoading(true);
        e.preventDefault();
        const username = localStorage.getItem('username');

        try {
            const response = await axiosHeader.post(`/forums/users/${username}`, {
                name: username,
                title: title,
                text: text,
                topic: topic,
                date: new Date().toISOString(),
            });
            navigate(`/forums/${response.data.id}`);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    function handleReset() {
        setTitle('');
        setText('');
        setTopic('');
    }

    return (<>

            <div className={styles['background-color']}>

                <section className="outer-container">
                    <div className={`inner-container ${styles['section-hero__inner-container']}`}>
                        <h1>Auti-Women Forum</h1>
                        <h2>Deel je problemen, geef advies en wees respectvol</h2>
                    </div>
                </section>

                <section className={styles['section-forum']}>
                    <form onSubmit={addForum} onReset={handleReset} className={styles['forum-form']}>

                        <label htmlFor="name">Naam:
                            <input type="text"
                                   name="name"
                                   id="name"
                                   value={localStorage.getItem('username')}
                            />
                        </label>

                        <label htmlFor="title">Titel:
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

                        <label htmlFor="topic" className={styles['forum-form__topic']}> Selecteer het bijpassende
                            onderwerp:
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
                            {loading && <p>Laden...</p>}
                            {error && <p>Er is iets fout gegaan, controleer of alle velden ingevuld zijn.</p>}
                            <Button type="reset">Annuleren</Button>
                            <Button type="submit">Verstuur</Button>
                        </div>

                    </form>

                </section>

            </div>
        </>

    );
}

export default ForumCreate;
