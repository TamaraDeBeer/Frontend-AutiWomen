import {useEffect, useState} from "react";
import styles from './ProfileEdit.module.css';
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function EditProfilePicture({user, onUpdate}) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    const handleProfilePictureSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", profilePicture);
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        try {
            await axiosHeader.put(`/users/${user.username}/profile-picture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, signal
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
                <form onSubmit={handleProfilePictureSubmit} className={styles['edit-form']}>
                    <label htmlFor="photo-field" className={styles['change-image']}>
                        Profielfoto: foto kiezen
                        <input
                            id="photo-field"
                            type="file"
                            name="photo"
                            onChange={handleProfilePictureChange}
                            className={styles['file-input']}
                        />
                    </label>
                    {fileName && <p className={styles['file-name']}>{fileName}</p>}
                    <Button type="submit" variant="secondary">Update Profielfoto</Button>
                    {loading && <p>Laden...</p>}
                    {error && <ErrorMessage message={error}/>}
                </form>
            )}
        </div>
    );
}

export default EditProfilePicture;