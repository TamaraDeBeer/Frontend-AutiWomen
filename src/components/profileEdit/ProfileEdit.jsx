import {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import styles from './ProfileEdit.module.css';

function ProfileEdit({profile, onUpdate}) {
    const {user} = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [profileData, setProfileData] = useState({
        name: profile.name,
        email: profile.email,
        dob: profile.dob,
        autismDiagnoses: profile.autismDiagnoses,
        autismDiagnosesYear: profile.autismDiagnosesYear,
    });

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleProfileDataChange = (e) => {
        const {name, value} = e.target;
        setProfileData({...profileData, [name]: value});
    };

    async function handleProfilePictureSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", profilePicture);

        try {
            await axios.put(`http://localhost:1991/users/${user.username}/profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    }

    async function handlePasswordSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1991/users/${user.username}/password`, {
                username: user.username,
                password: password,
                oldPassword: oldPassword
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
        } catch (error) {
            console.error("Error updating password:", error);
        }
    }

    async function handleProfileDataSubmit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1991/users/${user.username}/profile-data`, profileData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
        } catch (error) {
            console.error("Error updating profile data:", error);
        }
    }

    return (
        <div className={styles['profile-edit']}>
            <form onSubmit={handleProfilePictureSubmit}>
                <label>
                    Profielfoto:
                    <input type="file" onChange={handleProfilePictureChange}/>
                </label>
                <button type="submit">Update Profielfoto</button>
            </form>

            <form onSubmit={handlePasswordSubmit}>
                <label>
                    Oud Wachtwoord:
                    <input type="password" value={oldPassword} onChange={handleOldPasswordChange}/>
                </label>
                <label>
                    Nieuw Wachtwoord:
                    <input type="password" value={password} onChange={handlePasswordChange}/>
                </label>
                <button type="submit">Update Wachtwoord</button>
            </form>

            <form onSubmit={handleProfileDataSubmit}>
                <label>
                    Naam:
                    <input type="text" name="name" value={profileData.name} onChange={handleProfileDataChange}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={profileData.email} onChange={handleProfileDataChange}/>
                </label>
                <label>
                    Geboortedatum:
                    <input type="date" name="dob" value={profileData.dob} onChange={handleProfileDataChange}/>
                </label>
                <label>
                    Autisme:
                    <select name="autismDiagnoses" value={profileData.autismDiagnoses} onChange={handleProfileDataChange}>
                        <option value="Ja">Ja</option>
                        <option value="Nee">Nee</option>
                    </select>
                </label>
                {profileData.autismDiagnoses === 'Ja' && (
                    <label>
                        Autisme diagnose sinds:
                        <input type="number" name="autismDiagnosesYear" value={profileData.autismDiagnosesYear} onChange={handleProfileDataChange}/>
                    </label>
                )}
                <button type="submit">Update Gegevens</button>
            </form>
        </div>
    );
}

export default ProfileEdit;