import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import ForumPostShort from '../../components/forumPostShort/ForumPostShort';
import BioPost from '../../components/bioPost/BioPost';
import BioEdit from '../../components/bioEdit/BioEdit';
import calculateAge from '../../helpers/calculateAge';
import createDateToString from '../../helpers/createDateToString';
import styles from './UserProfile.module.css';

function UserProfile() {
    const {username} = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [bio, setBio] = useState({});
    const [forums, setForums] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        fetchUserInfo();
        fetchBio();
        fetchForums();
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

    async function fetchBio() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.get(`http://localhost:1991/users/profiles/${username}`);
            setBio(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchForums() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.get(`http://localhost:1991/users/${username}/forums`);
            const sortedForums = response.data.sort((a, b) => b.id - a.id);
            setForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <>
            <section className="outer-container">
                <h2>Welkom op de profielpagina van {username}</h2>
            </section>

            <section>
                <h2>{username} informatie</h2>
             <ul>
                 <li>Username: {userInfo.username}</li>
                 <li>Leeftijd: {userInfo.dob}</li>
                 <li>Autisme: {userInfo.autismDiagnoses}</li>
                 <li>Autisme diagnose sinds: {userInfo.autismDiagnosesYear}</li>
             </ul>
            </section>

            <section className={styles['profile-bio']}>
                <h2>Bio van {username}</h2>
                <p>{bio.bio}</p>
            </section>

            <section className={styles['profile-forums']}>
                <h2>Forums door {username}</h2>
                {forums.length > 0 ? (
                    forums.map((forum) => (
                        <ForumPostShort
                            key={forum.id}
                            forumId={forum.id}
                            image={forum.userDto?.profilePictureUrl}
                            name={forum.name}
                            age={calculateAge(forum.age) + ' years'}
                            title={forum.title}
                            date={createDateToString(forum.date)}
                            text={forum.text.split(' ').slice(0, 50).join(' ')}
                            link={`/forums/${forum.id}`}
                            likesCount={forum.likesCount}
                            commentsCount={forum.commentsCount}
                            viewsCount={forum.viewsCount}
                            lastReaction={forum.lastReaction ? createDateToString(forum.lastReaction) : 'No reactions yet'}
                        />
                    ))
                ) : (
                    <p>No forums found.</p>
                )}
            </section>


        </>
    );
}

export default UserProfile;