import styles from './AccountProfile.module.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import axios from "axios";
import calculateAge from "../../helpers/calculateAge.jsx";

function AccountProfile() {
    const [profile, setProfile] = useState({});
    const {user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchProfileData() {
            const jwt = localStorage.getItem('jwt');
            const username = localStorage.getItem('username');
            console.log(username);

            try {
                const result = await axios.get(`http://localhost:1991/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setProfile(result.data);
                console.log(result.data);
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