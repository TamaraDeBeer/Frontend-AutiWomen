import { useState } from "react";
import axios from "axios";
import styles from './ProfileEdit.module.css';
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function EditProfilePassword({ user, onUpdate }) {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);

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
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error updating password:", error);
            toggleError('Niet gelukt, waarschijnlijk klopt je oude wachtwoord niet');
        }
    };

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
        <form onSubmit={handlePasswordSubmit} className={styles['edit-form']}>
            <label>
                Oud Wachtwoord:
                <input type="password" value={oldPassword} onChange={handleOldPasswordChange} />
            </label>
            <label>
                Nieuw Wachtwoord:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <Button type="submit" variant="secondary">Update Wachtwoord</Button>
            {error && <ErrorMessage message={error} />}
        </form>
                )}
        </div>
    );
}

export default EditProfilePassword;