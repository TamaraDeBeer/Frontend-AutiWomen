import styles from './AccountProfile.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import axios from "axios";
import EditProfilePicture from "../../components/profileEdit/EditProfilePicture.jsx";
import EditProfilePassword from "../../components/profileEdit/EditProfilePassword.jsx";
import EditProfileData from "../../components/profileEdit/EditProfileData.jsx";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";
import BioEdit from "../../components/bioEdit/BioEdit.jsx";
import BioPost from "../../components/bioPost/BioPost.jsx";
import ReviewPost from "../../components/reviewPost/ReviewPost.jsx";
import ReviewEdit from "../../components/reviewEdit/ReviewEdit.jsx";


function AccountProfile() {
    const [profile, setProfile] = useState({});
    const [bio, setBio] = useState({});
    const [forums, setForums] = useState([]);
    const [likedForums, setLikedForums] = useState([]);
    const [commentedForums, setCommentedForums] = useState([]);
    const [viewedForums, setViewedForums] = useState([]);
    const [review, setReview] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        void fetchProfile(jwt, username);
        void fetchBio(jwt, username);
        void fetchForums(jwt, username);
        void fetchLikedForums(jwt, username);
        void fetchViewedForums(jwt, username);
        void fetchCommentedForums(jwt, username);
        void fetchReview(jwt, username);
    }, [])

    async function fetchProfile(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const profileResult = await axios.get(`http://localhost:1991/users/${username}`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            setProfile(profileResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchBio(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const profileResult = await axios.get(`http://localhost:1991/users/profiles/${username}`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            setBio(profileResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchForums(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/forums`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchLikedForums(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/liked-forums`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setLikedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchViewedForums(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/viewed-forums`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setViewedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchCommentedForums(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/commented-forums`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setCommentedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchReview(jwt, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.get(`http://localhost:1991/reviews/${username}`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${jwt}`,
                },
            });
            setReview(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
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
                                    <li>Autisme diagnose sinds: {profile.autismDiagnosesYear}</li>)}
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

            <section className={styles['section-bio_container']}>
                {bio.bio ? (<div className={styles['section-bio']}>
                        <h2>Jouw Verhaal</h2>
                        <p>{bio.bio}</p>
                        <button onClick={() => setActiveForm('bioEdit')}
                                className={`${styles['button']} ${styles['button-bio']}`}>Update jouw verhaal
                        </button>
                    </div>) : (<BioPost bio={bio.bio} user={user}
                                        onUpdate={() => fetchBio(localStorage.getItem('jwt'), localStorage.getItem('username'))}/>)}
                {activeForm === 'bioEdit' && (<BioEdit bio={bio} user={user} onUpdate={() => {
                        fetchBio(localStorage.getItem('jwt'), localStorage.getItem('username'));
                        setActiveForm(null);
                    }}/>)}

            </section>

            <section className={styles['account-forum']}>
                <h2>Jouw Forums</h2>
                {forums.length > 0 ? (forums.map((forum) => (<ForumPostShort
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
                        />))) : (<p>Geen forums gevonden.</p>)}
                {error &&
                    <ErrorMessage message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
            </section>

            <div className={styles['section-forum__line']}></div>
            <div className={styles['forums_other']}>
                <section className={`${styles['account-forum']} ${styles['forum-like']}`}>
                    <h2>Liked Forums</h2>
                    {likedForums.length > 0 ? (likedForums.map((forum) => (<PopulairForum
                                key={forum.id}
                                id={forum.id}
                                name={forum.name}
                                age={calculateAge(forum.age) + ' jaar'}
                                image={forum.userDto?.profilePictureUrl}
                                title={forum.title}
                            />))) : (<p>Geen forums gevonden.</p>)}
                    {error && <ErrorMessage
                        message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
                </section>

                <section className={`${styles['account-forum']} ${styles['forum-view']}`}>
                    <h2>Viewed Forums</h2>
                    {viewedForums.length > 0 ? (viewedForums.map((forum) => (<PopulairForum
                                key={forum.id}
                                id={forum.id}
                                name={forum.name}
                                age={calculateAge(forum.age) + ' jaar'}
                                image={forum.userDto?.profilePictureUrl}
                                title={forum.title}
                            />))) : (<p>Geen forums gevonden.</p>)}
                    {error && <ErrorMessage
                        message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
                </section>


                <section className={`${styles['account-forum']} ${styles['forum-comment']}`}>
                    <h2>Gereageerde Forums</h2>
                    {commentedForums.length > 0 ? (commentedForums.map((forum) => (<PopulairForum
                                key={forum.id}
                                id={forum.id}
                                name={forum.name}
                                age={calculateAge(forum.age) + ' jaar'}
                                image={forum.userDto?.profilePictureUrl}
                                title={forum.title}
                            />))) : (<p>Geen forums gevonden.</p>)}
                    {error && <ErrorMessage
                        message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}
                </section>
            </div>
            <div className={styles['section-forum__line']}></div>

            <section className={styles['section-bio_container']}>
                {review.review ? (<div className={styles['section-bio']}>
                        <h2>Jouw Review</h2>
                        <p>{review.review}</p>
                        <button onClick={() => setActiveForm('reviewEdit')}
                                className={`${styles['button']} ${styles['button-bio']}`}>Update jouw review
                        </button>
                    </div>) : (<ReviewPost review={review.review} user={user}
                                           onUpdate={() => fetchReview(localStorage.getItem('jwt'), localStorage.getItem('username'))}/>)}
                {activeForm === 'reviewEdit' && (<ReviewEdit review={review} user={user} onUpdate={() => {
                        fetchReview(localStorage.getItem('jwt'), localStorage.getItem('username'));
                        setActiveForm(null);
                    }}/>)}

            </section>


        </>);
}

export default AccountProfile;