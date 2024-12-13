import {useEffect, useState} from "react";
import styles from './ProfileEdit.module.css';
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function EditProfilePassword({ user, onUpdate }) {
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            await axiosHeader.put(`/users/${user.username}/password`, {
                username: user.username,
                password: password,
                oldPassword: oldPassword,
                signal
            });
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

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
            {loading && <p>Laden...</p>}
            {error && <ErrorMessage message={error} />}
        </form>
                )}
        </div>
    );
}

export default EditProfilePassword;