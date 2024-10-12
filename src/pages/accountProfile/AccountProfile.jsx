import styles from './AccountProfile.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import axios from "axios";
import EditProfilePicture from "../../components/profileEdit/editProfilePicture/EditProfilePicture.jsx";
import EditProfilePassword from "../../components/profileEdit/editProfilePassword/EditProfilePassword.jsx";
import EditProfileData from "../../components/profileEdit/editProfileData/EditProfileData.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";


function AccountProfile() {
    const [profile, setProfile] = useState({});
    const [forums, setForums] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [likedForums, setLikedForums] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [viewedForums, setViewedForums] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [error, toggleError] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        void fetchProfile(jwt, username);
        void fetchForums(jwt, username);
        void fetchLikedForums(jwt, username);
        void fetchViewedForums(jwt, username);
    }, [])

    async function fetchProfile(jwt, username) {
        toggleError(false);
        try {
            const profileResult = await axios.get(`http://localhost:1991/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setProfile(profileResult.data);
            console.log(profileResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function fetchForums(jwt, username) {
        toggleError(false);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/forums`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setForums(sortedForums);
            console.log(forumsResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function fetchLikedForums(jwt, username) {
        toggleError(false);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/liked-forums`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setLikedForums(sortedForums);
            console.log(forumsResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    async function fetchViewedForums(jwt, username) {
        toggleError(false);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/viewed-forums`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setViewedForums(sortedForums);
            console.log(forumsResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (<>

            <section className="outer-container">
                <div className={`inner-container ${styles['section-hero__inner-container']}`}>
                    <h1>Auti-Women</h1>
                    <h2>Welkom {user.username}!</h2>
                </div>
            </section>

            <section className={styles['section-profile__inner-container']}>
                <div className={styles['profile-complete']}>

                    <div className={styles['image-data']}>
                        <div className={styles['section-profile_image']}>
                            <img src={profile.profilePictureUrl} className={styles['profile_picture']}
                                 alt="Profiel Foto"/>
                        </div>


                        <div className={styles['section-profile_data']}>
                            <h2>Jouw Gegegens</h2>
                            <ul className={styles['profile_data']}>
                                <li>Username: {profile.username}</li>
                                <li>Email: {profile.email}</li>
                                <li>Naam: {profile.name}</li>
                                <li>Leeftijd: {profile.dob}</li>
                                <li>Autisme: {profile.autismDiagnoses}</li>
                                {profile.autismDiagnoses === 'Ja' && (
                                    <li>Autisme diagnose sinds: {profile.autismDiagnosesYear}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className={styles['buttons']}>
                        <button onClick={() => setActiveForm('profilePicture')}
                                className={`${styles['button']} ${styles['button-left']}`}>Update
                            Profielfoto
                        </button>
                        <button onClick={() => setActiveForm('password')}
                                className={`${styles['button']} ${styles['button-middle']}`}>Update Wachtwoord
                        </button>
                        <button onClick={() => setActiveForm('userInfo')}
                                className={`${styles['button']} ${styles['button-right']}`}>Update Gegevens
                        </button>
                    </div>
                </div>


                <div className={styles['forms-edit']}>
                    {activeForm === 'profilePicture' && <EditProfilePicture user={user}
                                                                            onUpdate={() => fetchProfile(localStorage.getItem('jwt'), localStorage.getItem('username'))}/>}
                    {activeForm === 'password' && <EditProfilePassword user={user}
                                                                       onUpdate={() => fetchProfile(localStorage.getItem('jwt'), localStorage.getItem('username'))}/>}
                    {activeForm === 'userInfo' && <EditProfileData user={user} profile={profile}
                                                                   onUpdate={() => fetchProfile(localStorage.getItem('jwt'), localStorage.getItem('username'))}/>}
                </div>

            </section>


            <section className={styles['account-forum']}>
                <h2>Jouw Forums</h2>
                {forums.length > 0 ? (
                    forums.map((forum) => (
                        <ForumPostShort
                            key={forum.id}
                            forumId={forum.id}
                            image={forum.userDto?.profilePictureUrl}
                            name={forum.name}
                            age={calculateAge(forum.age) + ' jaar'}
                            title={forum.title}
                            date={createDateToString(forum.date)}
                            text={forum.text.split(' ').slice(0, 50).join(' ')}
                            link={`/forums/${forum.id}`}
                            likesCount={forum.likesCount}
                            commentsCount={forum.commentsCount}
                            viewsCount={forum.viewsCount}
                            lastReaction={forum.lastReaction ? createDateToString(forum.lastReaction) : 'Nog geen reacties'}
                        />
                    ))
                ) : (
                    <p>Geen forums gevonden.</p>
                )}
                {error &&
                    <ErrorMessage message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
            </section>

            <div className={styles['forums_view-like']}>
                <section className={`${styles['account-forum']} ${styles['forum-like']}`}>
                    <h2>Liked Forums</h2>
                    {likedForums.map((forum) => (
                        <PopulairForum
                            key={forum.id}
                            id={forum.id}
                            name={forum.name}
                            age={calculateAge(forum.age) + ' jaar'}
                            image={forum.userDto?.profilePictureUrl}
                            title={forum.title}
                        />
                    ))}
                </section>

                <section className={`${styles['account-forum']} ${styles['forum-view']}`}>
                    <h2>Viewed Forums</h2>
                    {viewedForums.map((forum) => (
                        <PopulairForum
                            key={forum.id}
                            id={forum.id}
                            name={forum.name}
                            age={calculateAge(forum.age) + ' jaar'}
                            image={forum.userDto?.profilePictureUrl}
                            title={forum.title}
                        />
                    ))}
                </section>


            <section className={`${styles['account-forum']} ${styles['forum-comment']}`}>
                <h2>Gereageerde Forums</h2>
            </section>
            </div>


        </>
    );
}

export default AccountProfile;