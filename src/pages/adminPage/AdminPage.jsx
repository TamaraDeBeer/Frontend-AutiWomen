import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import {Link} from "react-router-dom";

function AdminPage() {
    const [forums, setForums] = useState([]);
    // const [comments, setComments] = useState([]);
    // const [users, setUsers] = useState([]);
    // const [review, setReview] = useState([]);

    useEffect(() => {
        getAllForums()
    }, []);

    async function getAllForums() {
        try {
            const response = await axios.get('http://localhost:1991/forums');
            setForums(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteForum(id) {
        try {
            await axios.delete(`http://localhost:1991/forums/${id}`);
            setForums(forums.filter(forum => forum.id !== id));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles['admin-page']}>
            <h1>Admin Page</h1>

            <section>
                <h2>Forums</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forums.map(forum => (
                        <tr key={forum.id}>
                            <td>{forum.id}</td>
                            <td><Link to={`/forum/${forum.id}`}>{forum.title}</Link></td>
                            <td>
                                <button onClick={() => deleteForum(forum.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>




        </div>
    );
}

export default AdminPage;