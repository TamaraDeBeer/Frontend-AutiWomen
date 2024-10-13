import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ProfileEdit.module.css';

function EditForum({ forumId, forumData, onUpdate }) {
    const [title, setTitle] = useState(forumData.title);
    const [text, setText] = useState(forumData.text);
    const navigate = useNavigate();

    async function handleEdit(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1991/forums/${forumId}`, { title, text });
            onUpdate();
            navigate(`/forums/${forumId}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form onSubmit={handleEdit} className={styles['edit-form']}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Text:
                <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </label>
            <Button type="submit">Save</Button>
        </form>
    );
}

export default EditForum;