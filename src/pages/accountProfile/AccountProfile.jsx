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
import styles from './AccountProfile.module.css';
import useFetchAccountProfile from "../../hooks/useFetchAccountProfile.jsx";

function AccountProfile() {
    const [profile, setProfile] = useState({});
    const [bio, setBio] = useState({});
    const [forums, setForums] = useState([]);
    const [likedForums, setLikedForums] = useState([]);
    const [commentedForums, setCommentedForums] = useState([]);
    const [viewedForums, setViewedForums] = useState([]);
    const [review, setReview] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const { fetchData, error, loading } = useFetchAccountProfile();
    const {isAuth, user} = useContext(AuthContext);

    useEffect(() => {
        if (isAuth && user) {
            const username = user.username;
            void fetchProfile(username);
            void fetchBio(username);
            void fetchForums(username);
            void fetchLikedForums(username);
            void fetchViewedForums(username);
            void fetchCommentedForums(username);
            void fetchReview(username);
        }
    }, [isAuth, user]);

    async function fetchProfile(username) {
        const data = await fetchData('profile', `/users/${username}`);
        if (data) setProfile(data);
    }

    async function fetchBio(username) {
        const data = await fetchData('bio', `/profiles/users/${username}`);
        if (data) setBio(data);
    }

    async function fetchForums(username) {
        const data = await fetchData('forums', `/forums/users/${username}`);
        if (data) {
            const sortedForums = data.sort((a, b) => b.id - a.id);
            setForums(sortedForums);
        }
    }

    async function fetchLikedForums(username) {
        const data = await fetchData('likedForums', `/forums/users/${username}/liked-forums`);
        if (data) {
            const sortedForums = data.sort((a, b) => b.id - a.id);
            setLikedForums(sortedForums);
        }
    }

    async function fetchViewedForums(username) {
        const data = await fetchData('viewedForums', `/forums/users/${username}/viewed-forums`);
        if (data) {
            const sortedForums = data.sort((a, b) => b.id - a.id);
            setViewedForums(sortedForums);
        }
    }

    async function fetchCommentedForums(username) {
        const data = await fetchData('commentedForums', `/forums/users/${username}/commented-forums`);
        if (data) {
            const sortedForums = data.sort((a, b) => b.id - a.id);
            setCommentedForums(sortedForums);
        }
    }

    async function fetchReview(username) {
        const data = await fetchData('review', `/reviews/users/${username}`);
        if (data) setReview(data);
    }

    return (
        <>
            {(loading.profile || loading.bio || loading.forums || loading.likedForums || loading.commentedForums || loading.viewedForums || loading.review) && <p>Loading...</p>}
            {(error.profile || error.bio || error.forums || error.likedForums || error.commentedForums || error.viewedForums || error.review) && <p>Er is een fout opgetreden. Probeer het later opnieuw.</p>}
            {!loading.profile && !loading.bio && !loading.forums && !loading.likedForums && !loading.commentedForums && !loading.viewedForums && !loading.review && !error.profile && !error.bio && !error.forums && !error.likedForums && !error.commentedForums && !error.viewedForums && !error.review && user ? (
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
                                <button type="button" onClick={() => setActiveForm('profilePicture')}
                                        className={`${styles['button']} ${styles['button-left']}`}>Update Profielfoto
                                </button>
                                <button type="button" onClick={() => setActiveForm('password')}
                                        className={`${styles['button']} ${styles['button-middle']}`}>Update Wachtwoord
                                </button>
                                <button type="button" onClick={() => setActiveForm('userInfo')}
                                        className={`${styles['button']} ${styles['button-right']}`}>Update Gegevens
                                </button>
                            </div>
                        </div>
                        <div className={styles['forms-edit']}>
                            {activeForm === 'profilePicture' && (
                                <div className={styles['form-container']}>
                                    <button type="button" className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                    </button>
                                    <EditProfilePicture user={user}
                                                        onUpdate={() => fetchProfile(user.username)}/>
                                </div>
                            )}
                            {activeForm === 'password' && (
                                <div className={styles['form-container']}>
                                    <button type="button" className={styles['close-button']} onClick={() => setActiveForm(null)}>X
                                    </button>
                                    <EditProfilePassword user={user}
                                                         onUpdate={() => fetchProfile(user.username)}/>
                                </div>
                            )}
                            {activeForm === 'userInfo' && (
                                <div className={styles['form-container']}>
                                    <button type="button" className={styles['close-button']} onClick={() => setActiveForm(null)}>X
                                    </button>
                                    <EditProfileData user={user} profile={profile}
                                                     onUpdate={() => fetchProfile(user.username)}/>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className={styles['section-bio_container']}>
                        {bio.bio ? (
                            <div className={styles['section-bio']}>
                                <h2>Jouw Verhaal</h2>
                                <p>{bio.bio}</p>
                                <button type="button" onClick={() => setActiveForm('bioEdit')}
                                        className={`${styles['button']} ${styles['button-bio']}`}>Update jouw verhaal
                                </button>
                            </div>
                        ) : (
                            <BioPost bio={bio.bio} user={user}
                                     onUpdate={() => fetchBio(user.username)}/>
                        )}
                        {activeForm === 'bioEdit' && (
                            <div className={styles['form-container']}>
                                <button type="button" className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                </button>
                                <BioEdit bio={bio} user={user} onUpdate={() => {
                                    fetchBio(user.username);
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
                                    age={calculateAge(forum.dob) + ' jaar'}
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
                                        age={calculateAge(forum.dob) + ' jaar'}
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
                                        age={calculateAge(forum.dob) + ' jaar'}
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
                                        age={calculateAge(forum.dob) + ' jaar'}
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
                                <button type="button" onClick={() => setActiveForm('reviewEdit')}
                                        className={`${styles['button']} ${styles['button-bio']}`}>Update jouw review
                                </button>
                            </div>
                        ) : (
                            <ReviewPost review={review.review} user={user}
                                        onUpdate={() => fetchReview(user.username)}/>
                        )}
                        {activeForm === 'reviewEdit' && (
                            <div className={styles['form-container']}>
                                <button type="button" className={styles['close-button']} onClick={() => setActiveForm(null)}>x
                                </button>
                                <ReviewEdit review={review} user={user} onUpdate={() => {
                                    fetchReview(user.username);
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