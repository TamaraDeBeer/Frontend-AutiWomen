import { useState } from "react";
import axios from "axios";
import styles from '../ProfileEdit.module.css';

function EditProfilePassword({ user, onUpdate }) {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = async (e) => {
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
    };

    return (
        <form onSubmit={handlePasswordSubmit} className={styles['password-form']}>
            <label>
                Oud Wachtwoord:
                <input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
            </label>
            <label>
                Nieuw Wachtwoord:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <button type="submit">Update Wachtwoord</button>
        </form>
    );
}

export default EditProfilePassword;