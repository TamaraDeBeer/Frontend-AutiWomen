import styles from './AccountProfile.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import axios from "axios";
import calculateAge from "../../helpers/calculateAge.jsx";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import anna from "../../assets/profilePhoto/anna.jpg";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";

function AccountProfile() {
    const [profile, setProfile] = useState({});
    const [forums, setForums] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchProfileData() {
            const jwt = localStorage.getItem('jwt');
            const username = localStorage.getItem('username');
            console.log(username);

            try {
                const profileResult = await axios.get(`http://localhost:1991/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setProfile(profileResult.data);
                console.log(profileResult.data);

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
            }
        }

        void fetchProfileData();
    }, [])


    return (<>

            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Welkom {user.username}!</h2>
                </div>
            </section>

            <section className={`${styles['outer-container']} ${styles['section-profile__inner-container']}`}>
                <div className={styles['inner-container']}>
                    <h2>Jouw Gegevens</h2>
                    <ul>
                        <li>Username: {profile.username}</li>
                        <li>Email: {profile.email}</li>
                        <li>Naam: {profile.name}</li>
                        {/*<li>Leeftijd: {calculateAge(profile.dob) + ' jaar'}</li>*/}
                        <li>Autisme: {profile.autismDiagnoses}</li>
                        {profile.autismDiagnoses === 'Ja' && (
                            <li>Autisme diagnose sinds: {profile.autismDiagnosesYear}</li>
                        )}
                    </ul>
                </div>
            </section>

            <section className={styles['outer-container']}>
                <div className={styles['innerContainer']}>
                    <h2>Jouw Forums</h2>

                    {forums.length > 0 ? (
                        forums.map((forum) => (
                            <ForumPostShort
                                key={forum.id}
                                image={anna}
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

                    {/*{Object.keys(forums).length > 0 &&*/}

                    {/*    forums.map((forum) => {*/}
                    {/*            return <ForumPostShort*/}
                    {/*                key={forum.id}*/}
                    {/*                image={anna}*/}
                    {/*                name={forum.name}*/}
                    {/*                age={calculateAge(forum.age) + ' jaar'}*/}
                    {/*                title={forum.title}*/}
                    {/*                text={forum.text.split(' ').slice(0, 40).join(' ')}*/}
                    {/*                link={`/forum/${forum.id}`}*/}
                    {/*                likes={forum.likes}*/}
                    {/*                comments={forum.comments}*/}
                    {/*                views={forum.views}*/}
                    {/*                lastReaction={forum.lastReaction}*/}
                    {/*            />*/}
                    {/*        }*/}
                    {/*    )}*/}
                    {/*{error && <ErrorMessage*/}
                    {/*    message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw."/>}*/}
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