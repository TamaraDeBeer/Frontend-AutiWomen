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


function AccountProfile() {
    const [profile, setProfile] = useState({});
    const [forums, setForums] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        void fetchProfile(jwt, username);
        void fetchForums(jwt, username);
    }, [])

    async function fetchProfile(jwt, username) {
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
        try {
            const forumsResult = await axios.get(`http://localhost:1991/users/${username}/forums`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setForums(forumsResult.data);
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


            <section className={styles['outer-container']}>
                <div className={styles['innerContainer']}>
                    <h2>Jouw Forums</h2>

                    {forums.length > 0 ? (
                        forums.map((forum) => (
                            <ForumPostShort
                                key={forum.id}
                                name={forum.name}
                                age={calculateAge(forum.age) + ' jaar'}
                                title={forum.title}
                                text={forum.text.split(' ').slice(0, 40).join(' ')}
                                link={`/forum/${forum.id}`}
                                likes={forum.likes}
                                comments={forum.comments}
                                views={forum.views}
                                lastReaction={forum.lastReaction}
                            />
                        ))
                    ) : (
                        <p>Geen forums gevonden.</p>
                    )}
                    {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw." />}
                </div>
            </section>

            <section className={styles['outer-container']}>
                <div className={styles['innerContainer']}>
                    <h2>Jouw Comment</h2>
                </div>
            </section>
        </>
    );
}

export default AccountProfile;