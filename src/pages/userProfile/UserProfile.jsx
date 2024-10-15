import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserForums from '../../components/userForums/UserForums';
import styles from './UserProfile.module.css';

function UserProfile() {
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchUserInfo();
    }, [username]);

    async function fetchUserInfo() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.get(`http://localhost:1991/users/${username}`);
            setUserInfo(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <section className={styles['user-profile']}>
            <h2 className={styles['title']}>Profile of {username}</h2>
            {error && <p>There was an error fetching the data. Please try again.</p>}
            {loading && <p>Loading...</p>}
            {!loading && !error && (
                <>
                    <div className={styles['user-info']}>
                        <img src={userInfo.profilePictureUrl} alt={`${username}'s profile`} />
                        <p>Name: {userInfo.name}</p>
                        <p>Age: {userInfo.age}</p>
                        <p>Bio: {userInfo.bio}</p>
                    </div>
                    <UserForums username={username} currentForumId={null} />
                </>
            )}
        </section>
    );
}

export default UserProfile;