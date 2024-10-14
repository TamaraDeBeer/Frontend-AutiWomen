import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import {Link} from "react-router-dom";

function AdminPage() {
    const [forums, setForums] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [review, setReview] = useState([]);

    useEffect(() => {
        getAllForums()
        getAllComments()
        getAllUsers()
        getAllReviews()
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

    async function getAllUsers() {
        try {
            const response = await axios.get('http://localhost:1991/users');
            setUsers(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteUser(username) {
        try {
            await axios.delete(`http://localhost:1991/users/${username}`);
            setUsers(users.filter(user => user.username !== username));
        } catch (e) {
            console.error(e);
        }
    }

    async function getAllReviews() {
        try {
            const response = await axios.get('http://localhost:1991/reviews');
            setReview(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteReview(id) {
        try {
            await axios.delete(`http://localhost:1991/reviews/${id}`);
            setReview(review.filter(review => review.id !== id));
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
                                <button onClick={() => deleteComment(comment.forumDto.id, comment.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Users</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Autisme?</th>
                        <th>Diagnose Jaar</th>
                        <th>Leeftijd</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <th>{user.autismDiagnoses}</th>
                            <th>{user.autismDiagnosesYear}</th>
                            <th>{user.dob}</th>
                            <th>{user.email}</th>
                            <th>{user.authorities[0]?.authority}</th>
                            <td>
                                <button onClick={() => deleteUser(user.username)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Reviews</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Review</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {review.map(review => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <th>{review.name}</th>
                            <th>{review.review}</th>
                            <td>
                                <button onClick={() => deleteReview(review.id)}>Delete</button>
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