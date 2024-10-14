import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import {Link} from "react-router-dom";

function AdminPage() {
    const [forums, setForums] = useState([]);
    const [comments, setComments] = useState([]);
    // const [users, setUsers] = useState([]);
    // const [review, setReview] = useState([]);

    useEffect(() => {
        getAllForums()
        getAllComments()
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
            getAllComments();
        } catch (e) {
            console.error(e);
        }
    }

    async function getAllComments() {
        try {
            const response = await axios.get('http://localhost:1991/forums/comments');
            setComments(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteComment(forumId, commentId) {
        try {
            await axios.delete(`http://localhost:1991/forums/${forumId}/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
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
                        <th>User</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {forums.map(forum => (
                        <tr key={forum.id}>
                            <td>{forum.id}</td>
                            <td>{forum.user}</td>
                            <td><Link to={`/forum/${forum.id}`}>{forum.title}</Link></td>
                            <td>
                                <button onClick={() => deleteForum(forum.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Comments</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ForumId</th>
                        <td>User</td>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td>{comment.id}</td>
                            <td>{comment.forumDto.id}</td>
                            <td>{comment.name}</td>
                            <td>
                                <Link to={`/forum/${comment.forumId}`}>
                                    {comment.text.slice(0, 60)}...
                                </Link>
                            </td>
                            <td>
                                <button onClick={() => deleteComment(comment.forumDto.id, comment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            {/*<section>*/}
            {/*    <h2>Users</h2>*/}
            {/*    <table>*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th>ID</th>*/}
            {/*            <th>Username</th>*/}
            {/*            <th>Actions</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {users.map(user => (*/}
            {/*            <tr key={user.id}>*/}
            {/*                <td>{user.id}</td>*/}
            {/*                <td>{user.username}</td>*/}
            {/*                <td>*/}
            {/*                    <button onClick={() => deleteUser(user.id)}>Delete</button>*/}
            {/*                </td>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</section>*/}


        </div>
    );
}

export default AdminPage;