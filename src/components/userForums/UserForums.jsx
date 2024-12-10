import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserForums.module.css';
import axiosPublic from "../../helpers/axiosPublic.jsx";

function UserForums({ username, currentForumId }) {
    const [forums, setForums] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchUserForums();
    }, [username, currentForumId]);

    async function fetchUserForums() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosPublic.get('/forums');
            const userForums = response.data.filter(forum => forum.name === username && forum.id !== currentForumId);
            setForums(userForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <section className={styles['user-forums']}>
            <h2 className={styles['title']}>Forums van <Link to={`/users/${username}`} className={styles['link-user']}>{username}</Link></h2>
            {error && <p>Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw.</p>}
            {loading && <p>Loading...</p>}
            {forums.length === 0 ? (
                <p>Geen forums gevonden van dezelfde user</p>
            ) : (
                <ul className={styles['forums-list']}>
                    {forums.map((forum, index) => (
                        <li key={index}>
                            <Link to={`/forums/${forum.id}`}>{forum.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default UserForums;