import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RelatedForums.module.css';
import axiosPublic from "../../helpers/axiosPublic.jsx";


function RelatedForums({ topic, currentForumId }) {
    const [relatedForums, setRelatedForums] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchRelatedForums();
    }, [topic, currentForumId]);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function fetchRelatedForums() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            toggleLoading(true);
            const response = await axiosPublic.get('/forums', { signal });
            const filteredForums = response.data.filter(forum => forum.topic === topic && forum.id !== currentForumId);
            setRelatedForums(filteredForums);
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
        <div className={styles['related-forums']}>
            <h2 className={styles['title']}>Gerelateerde Forums</h2>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw.</p>}
            {loading && <p>Laden...</p>}
            {relatedForums.length === 0 ? (
                <p>Geen gerelateerde forums gevonden</p>
            ) : (
                <ul className={styles['forums-list']}>
                    {relatedForums.map(forum => (
                        <li key={forum.id}>
                            <Link to={`/forums/${forum.id}`}>{forum.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RelatedForums;