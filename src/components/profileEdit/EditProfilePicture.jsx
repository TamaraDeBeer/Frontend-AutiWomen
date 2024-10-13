import { useState } from "react";
import axios from "axios";
import styles from './ProfileEdit.module.css';
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function EditProfilePicture({ user, onUpdate }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleProfilePictureSubmit = async (e) => {
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
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error updating profile picture:", error);
            toggleError('Niet gelukt, waarschijnlijk is het bestand te groot');
        }
    };

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
                    {error && <ErrorMessage message={error} />}
                </form>
            )}
        </div>
    );
}

export default EditProfilePicture;