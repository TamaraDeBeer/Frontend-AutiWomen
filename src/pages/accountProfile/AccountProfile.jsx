import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import EditProfilePicture from "../../components/profileEdit/EditProfilePicture.jsx";
import EditProfilePassword from "../../components/profileEdit/EditProfilePassword.jsx";
import EditProfileData from "../../components/profileEdit/EditProfileData.jsx";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";
import BioEdit from "../../components/bioEdit/BioEdit.jsx";
import BioPost from "../../components/bioPost/BioPost.jsx";
import ReviewPost from "../../components/reviewPost/ReviewPost.jsx";
import ReviewEdit from "../../components/reviewEdit/ReviewEdit.jsx";
import {Link} from "react-router-dom";
import axiosHeader from "../../helpers/axiosHeader.jsx";
import styles from './AccountProfile.module.css';

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
    const [loading, toggleLoading] = useState(false);
    const [username, setUsername] = useState('');
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername);
            void fetchProfile(storedUsername);
            void fetchBio(storedUsername);
            void fetchForums(storedUsername);
            void fetchLikedForums(storedUsername);
            void fetchViewedForums(storedUsername);
            void fetchCommentedForums(storedUsername);
            void fetchReview(storedUsername);
        }
    }, [user]);

    async function fetchProfile(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const profileResult = await axiosHeader.get(`/users/${username}`);
            setProfile(profileResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchBio(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const profileResult = await axiosHeader.get(`/profiles/${username}`);
            setBio(profileResult.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchForums(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axiosHeader.get(`/users/${username}/forums`);
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchLikedForums(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axiosHeader.get(`/users/${username}/liked-forums`);
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setLikedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchViewedForums(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axiosHeader.get(`/users/${username}/viewed-forums`);
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setViewedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchCommentedForums(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const forumsResult = await axiosHeader.get(`/users/${username}/commented-forums`);
            const sortedForums = forumsResult.data.sort((a, b) => b.id - a.id);
            setCommentedForums(sortedForums);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function fetchReview(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get(`/reviews/${username}`);
            setReview(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <>
            {user ? (
                <>
                    <section className="outer-container">
                        <div className={`inner-container ${styles['section-hero__inner-container']}`}>
                            <h1>Auti-Women</h1>
                            <h2>Welkom {user.username}!</h2>
                            {profile.authorities && profile.authorities.length > 0 && profile.authorities[0].authority === 'ROLE_ADMIN' && (
                                <Link to="/admin" className={styles['admin-link']}>Admin Page</Link>
                            )}
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
                                        {profile.dob && <li>Leeftijd: {calculateAge(profile.dob) + ' jaar'}</li>}
                                        <li>Autisme: {profile.autismDiagnoses}</li>
                                        {profile.autismDiagnoses === 'Ja' && (
                                            <li>Autisme diagnose sinds: {profile.autismDiagnosesYear}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles['buttons']}>
                                <button onClick={() => setActiveForm('profilePicture')}
                                        className={`${styles['button']} ${styles['button-left']}`}>Update Profielfoto
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
                            {activeForm === 'profilePicture' && (
                                <div className={styles['form-container']}>
                                    <button className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                    </button>
                                    <EditProfilePicture user={user}
                                                        onUpdate={() => fetchProfile(username)}/>
                                </div>
                            )}
                            {activeForm === 'password' && (
                                <div className={styles['form-container']}>
                                    <button className={styles['close-button']} onClick={() => setActiveForm(null)}>X
                                    </button>
                                    <EditProfilePassword user={user}
                                                         onUpdate={() => fetchProfile(username)}/>
                                </div>
                            )}
                            {activeForm === 'userInfo' && (
                                <div className={styles['form-container']}>
                                    <button className={styles['close-button']} onClick={() => setActiveForm(null)}>X
                                    </button>
                                    <EditProfileData user={user} profile={profile}
                                                     onUpdate={() => fetchProfile(username)}/>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className={styles['section-bio_container']}>
                        {bio.bio ? (
                            <div className={styles['section-bio']}>
                                <h2>Jouw Verhaal</h2>
                                <p>{bio.bio}</p>
                                <button onClick={() => setActiveForm('bioEdit')}
                                        className={`${styles['button']} ${styles['button-bio']}`}>Update jouw verhaal
                                </button>
                            </div>
                        ) : (
                            <BioPost bio={bio.bio} user={user}
                                     onUpdate={() => fetchBio(username)}/>
                        )}
                        {activeForm === 'bioEdit' && (
                            <div className={styles['form-container']}>
                                <button className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                </button>
                                <BioEdit bio={bio} user={user} onUpdate={() => {
                                    fetchBio(username);
                                    setActiveForm(null);
                                }}/>
                            </div>
                        )}
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
                    </section>
                    <div className={styles['section-forum__line']}></div>

                    <div className={styles['forums_other']}>
                        <section className={`${styles['account-forum']} ${styles['forum-like']}`}>
                            <h2>Liked Forums</h2>
                            {likedForums.length > 0 ? (
                                likedForums.map((forum) => (
                                    <PopulairForum
                                        key={forum.id}
                                        id={forum.id}
                                        name={forum.name}
                                        age={calculateAge(forum.age) + ' jaar'}
                                        image={forum.userDto?.profilePictureUrl}
                                        title={forum.title}
                                    />
                                ))
                            ) : (
                                <p>Geen forums gevonden.</p>
                            )}
                        </section>
                        <section className={`${styles['account-forum']} ${styles['forum-view']}`}>
                            <h2>Viewed Forums</h2>
                            {viewedForums.length > 0 ? (
                                viewedForums.map((forum) => (
                                    <PopulairForum
                                        key={forum.id}
                                        id={forum.id}
                                        name={forum.name}
                                        age={calculateAge(forum.age) + ' jaar'}
                                        image={forum.userDto?.profilePictureUrl}
                                        title={forum.title}
                                    />
                                ))
                            ) : (
                                <p>Geen forums gevonden.</p>
                            )}
                        </section>
                        <section className={`${styles['account-forum']} ${styles['forum-comment']}`}>
                            <h2>Gereageerde Forums</h2>
                            {commentedForums.length > 0 ? (
                                commentedForums.map((forum) => (
                                    <PopulairForum
                                        key={forum.id}
                                        id={forum.id}
                                        name={forum.name}
                                        age={calculateAge(forum.age) + ' jaar'}
                                        image={forum.userDto?.profilePictureUrl}
                                        title={forum.title}
                                    />
                                ))
                            ) : (
                                <p>Geen forums gevonden.</p>
                            )}
                        </section>
                    </div>
                    <div className={styles['section-forum__line']}></div>
                    <section className={styles['section-bio_container']}>
                        {review.review ? (
                            <div className={styles['section-bio']}>
                                <h2>Jouw Review</h2>
                                <p>{review.review}</p>
                                <button onClick={() => setActiveForm('reviewEdit')}
                                        className={`${styles['button']} ${styles['button-bio']}`}>Update jouw review
                                </button>
                            </div>
                        ) : (
                            <ReviewPost review={review.review} user={user}
                                        onUpdate={() => fetchReview(username)}/>
                        )}
                        {activeForm === 'reviewEdit' && (
                            <div className={styles['form-container']}>
                                <button className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                </button>
                                <ReviewEdit review={review} user={user} onUpdate={() => {
                                    fetchReview(username);
                                    setActiveForm(null);
                                }}/>
                            </div>
                        )}
                    </section>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default AccountProfile;