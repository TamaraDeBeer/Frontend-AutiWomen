// src/components/DeleteForum/DeleteForum.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './DeleteForum.module.css';

function DeleteForum({ forumId, onDelete }) {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    async function handleDelete() {
        try {
            await axios.delete(`http://localhost:1991/forums/${forumId}`);
            setSuccess(true);
            onDelete();
            setTimeout(() => navigate('/forums'), 2000);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles['delete-container']}>
            {success ? (
                <p>Forum post successfully deleted!</p>
            ) : (
                <Button type="button" onClick={handleDelete}>Confirm Delete</Button>
            )}
        </div>
    );
}

export default DeleteForum;