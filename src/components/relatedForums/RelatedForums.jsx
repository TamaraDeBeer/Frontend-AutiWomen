import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './RelatedForums.module.css';


function RelatedForums({ topic, currentForumId }) {
    const [relatedForums, setRelatedForums] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchRelatedForums();
    }, [topic, currentForumId]);

    async function fetchRelatedForums() {
        setError(false);
        try {
            const response = await axios.get('http://localhost:1991/forums');
            const filteredForums = response.data.filter(forum => forum.topic === topic && forum.id !== currentForumId);
            setRelatedForums(filteredForums);
        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    return (
        <div className={styles['related-forums']}>
            <h2 className={styles['title']}>Gerelateerde Forums</h2>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw.</p>}
            <ul className={styles['forums-list']}>
                {relatedForums.map(forum => (
                    <li key={forum.id}>
                        <Link to={`/forums/${forum.id}`}>{forum.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RelatedForums;