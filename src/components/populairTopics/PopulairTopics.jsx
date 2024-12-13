import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PopulairTopics.module.css';
import axiosPublic from "../../helpers/axiosPublic.jsx";

function PopulairTopics() {
    const [topics, setTopics] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function fetchTopics() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const response = await axiosPublic.get('/topics/sorted/forums', { signal });
            setTopics(response.data);
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
        <section className={styles['populair-topics']}>
            <h2 className={styles['title']}>Populaire Onderwerpen</h2>
            {loading && <p>Laden...</p>}
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw.</p>}
            <ul className={styles['topics-list']}>
                {topics.map((topic, index) => (
                    <li key={index}>
                        <Link to={`/forums/topic/${topic}`}>{topic}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default PopulairTopics;