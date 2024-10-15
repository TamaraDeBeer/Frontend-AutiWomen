import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';
import {Link} from "react-router-dom";

function AdminPage() {
    const [forums, setForums] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [review, setReview] = useState([]);
    const [authorities, setAuthorities] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const [newAuthority, setNewAuthority] = useState({ username: '', authority: '' });
    const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
    const [updateAuthority, setUpdateAuthority] = useState({ username: '', oldAuthority: '', newAuthority: '' });

    useEffect(() => {
        getAllForums()
        getAllComments()
        getAllUsers()
        getAllReviews()
        getAllAuthorities();
    }, []);

    async function getAllForums() {
        try {
            const response = await axios.get('http://localhost:1991/forums');
            setForums(response.data);
            console.log(response.data);
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

    async function getAllAuthorities() {
        try {
            const response = await axios.get('http://localhost:1991/authorities');
            setAuthorities(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteUserAuthority(username, authority) {
        try {
            await axios.delete(`http://localhost:1991/${username}/authorities/${authority}`);
            setAuthorities(authorities.filter(auth => !(auth.username === username && auth.authority === authority)));
            getAllUsers();
        } catch (e) {
            console.error(e);
        }
    }

    async function addUserAuthority(event) {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:1991/${newAuthority.username}/authorities`, { authority: newAuthority.authority });
            setFormVisible(false);
            getAllAuthorities();
            getAllUsers();
        } catch (e) {
            console.error(e);
        }
    }

    async function updateUserAuthority(event) {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:1991/${updateAuthority.username}/authorities`, {
                oldAuthority: updateAuthority.oldAuthority,
                newAuthority: updateAuthority.newAuthority
            });
            setUpdateFormVisible(false);
            getAllAuthorities();
            getAllUsers();
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
                            <td>{forum.name}</td>
                            <td><Link to={`/forum/${forum.id}`}>{forum.title}</Link></td>
                            <td>
                                <button className={styles['admin-button']} onClick={() => deleteForum(forum.id)}>Delete</button>
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
                        <th>User</th>
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
                                <button className={styles['admin-button']} onClick={() => deleteComment(comment.forumDto.id, comment.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Users</h2>
                <button className={styles['admin-button']} onClick={() => setFormVisible(true)}>Add Authority</button>
                {isFormVisible && (
                    <form onSubmit={addUserAuthority} className={styles['admin-form']}>
                        <button type="button" className={styles['close-button']} onClick={() => setFormVisible(false)}>x</button>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newAuthority.username}
                            onChange={(e) => setNewAuthority({...newAuthority, username: e.target.value})}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Authority"
                            value={newAuthority.authority}
                            onChange={(e) => setNewAuthority({...newAuthority, authority: e.target.value})}
                            required
                        />
                        <button className={styles['admin-button']} type="submit">Submit</button>
                    </form>
                )}
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
                            <td>{user.autismDiagnoses}</td>
                            <td>{user.autismDiagnosesYear}</td>
                            <td>{user.dob}</td>
                            <td>{user.email}</td>
                            <td>{user.authorities[0]?.authority}</td>
                            <td>
                                <button className={styles['admin-button']} onClick={() => deleteUser(user.username)}>Delete</button>
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
                            <td>{review.name}</td>
                            <td>{review.review}</td>
                            <td>
                                <button className={styles['admin-button']} onClick={() => deleteReview(review.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Authorities</h2>
                <button className={styles['admin-button']} onClick={() => setUpdateFormVisible(true)}>Update Authority</button>
                {isUpdateFormVisible && (
                        <form onSubmit={updateUserAuthority} className={styles['admin-form']}>
                            <button type="button" className={styles['close-button']}
                                    onClick={() => setUpdateFormVisible(false)}>x
                            </button>
                            <input
                                type="text"
                                placeholder="Username"
                                value={updateAuthority.username}
                                onChange={(e) => setUpdateAuthority({...updateAuthority, username: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Old Authority"
                                value={updateAuthority.oldAuthority}
                                onChange={(e) => setUpdateAuthority({...updateAuthority, oldAuthority: e.target.value})}
                                required
                            />
                            <input
                                type="text"
                                placeholder="New Authority"
                                value={updateAuthority.newAuthority}
                                onChange={(e) => setUpdateAuthority({...updateAuthority, newAuthority: e.target.value})}
                                required
                            />
                            <button className={styles['admin-button']} type="submit">Submit</button>
                        </form>
                    )}
                <table>
                    <thead>
                    <tr>
                    <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authorities.map(auth => (
                        <tr key={`${auth.username}-${auth.authority}`}>
                            <td>{auth.username}</td>
                            <td>{auth.authority}</td>
                            <td>
                                <button className={styles['admin-button']} onClick={() => deleteUserAuthority(auth.username, auth.authority)}>Delete
                                </button>
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