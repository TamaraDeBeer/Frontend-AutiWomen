import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './UserForums.module.css';

function UserForums({ username }) {
    const [forums, setForums] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchUserForums();
    }, [username]);

    async function fetchUserForums() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.get('http://localhost:1991/forums');
            const userForums = response.data.filter(forum => forum.name === username);
            setForums(userForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <section className={styles['user-forums']}>
            <h2 className={styles['title']}>Forums van {username}</h2>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw.</p>}
            {loading && <p>Loading...</p>}
            <ul className={styles['forums-list']}>
                {forums.map((forum, index) => (
                    <li key={index}>
                        <Link to={`/forums/${forum.id}`}>{forum.title}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default UserForums;