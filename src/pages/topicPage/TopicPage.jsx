import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TopicPage.module.css';
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";
import Button from "../../components/button/Button.jsx";
import axiosPublic from "../../helpers/axiosPublic.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";

function TopicPage() {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [forums, setForums] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        fetchAllForums();
    }, [topic]);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function fetchAllForums() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            toggleLoading(true);
            const response = await axiosPublic.get('/forums', {signal});
            const filteredForums = response.data.filter(forum => forum.topic === topic);
            setForums(filteredForums);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <section className="outer-container">
                <div className={`inner-container ${styles['section-forum__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Deel je problemen, geef advies en wees respectvol</h2>
                    <div>
                        <Button type="button" className={styles['button-forum']}
                                onClick={() => navigate('/forum/create')}
                        >Schrijf een forum</Button>
                    </div>
                </div>
            </section>

            <section className={styles['section-topic__main']}>
                <section className={styles['section-topic__posts-short']}>
                    <h3>Forums voor topic: {topic}</h3>
                    {loading && <p>Laden...</p>}
                    {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van de forums. Probeer het opnieuw."/>}
                    {forums.map((forum) => {
                        return <ForumPostShort
                            key={forum.id}
                            forumId={forum.id}
                            image={forum.userDto?.profilePictureUrl}
                            name={forum.name}
                            age={calculateAge(forum.dob) + ' jaar'}
                            title={forum.title}
                            date={createDateToString(forum.date)}
                            text={forum.text.split(' ').slice(0, 50).join(' ')}
                            link={`/forums/${forum.id}`}
                            likesCount={forum.likesCount}
                            commentsCount={forum.commentsCount}
                            viewsCount={forum.viewsCount}
                            lastReaction={forum.lastReaction ? createDateToString(forum.lastReaction) : 'Nog geen reacties'}
                        />
                    })}
                </section>

                <section className={styles['section-forum__sidebar']}>
                    <PopulairTopics/>
                </section>
            </section>
        </>
    );
}

export default TopicPage;