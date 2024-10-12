import { useState } from "react";
import axios from "axios";
import styles from '../ProfileEdit.module.css';

function EditProfilePicture({ user, onUpdate }) {
    const [profilePicture, setProfilePicture] = useState(null);

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
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
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    return (
        <form onSubmit={handleProfilePictureSubmit} className={styles['profile-picture-form']}>
            <label>
                Profielfoto:
                <input type="file" onChange={handleProfilePictureChange} />
            </label>
            <button type="submit">Update Profielfoto</button>
        </form>
    );
}

export default EditProfilePicture;