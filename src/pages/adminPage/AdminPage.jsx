import {useEffect, useState} from 'react';
import styles from './AdminPage.module.css';
import {Link} from "react-router-dom";
import calculateAge from "../../helpers/calculateAge.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

function AdminPage() {
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
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
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get('/forums');
            setForums(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function deleteForum(forumId, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/forums/${forumId}/users/${username}`);
            setForums(forums.filter(forum => forum.id !== forumId));
            getAllComments();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function getAllComments() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get('/comments');
            setComments(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function deleteComment(commentId, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/comments/${commentId}/users/${username}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function getAllUsers() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get('/users');
            setUsers(response.data);
        } catch (e) {
            console.error(e);
            toggleError(false);
            toggleLoading(true);
        }
        toggleLoading(false);
    }

    async function deleteUser(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/users/${username}`);
            setUsers(users.filter(user => user.username !== username));
            getAllForums();
            getAllComments();
            getAllAuthorities();
            getAllReviews();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function getAllReviews() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get('/reviews');
            setReview(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function deleteReview(reviewId, username) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/reviews/${reviewId}/users/${username}`);
            setReview(review.filter(review => review.id !== reviewId));
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function getAllAuthorities() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.get('/authorities');
            setAuthorities(response.data);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function deleteUserAuthority(username, authority) {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.delete(`/authorities/${authority}/users/${username}`);
            setAuthorities(authorities.filter(auth => !(auth.username === username && auth.authority === authority)));
            getAllUsers();
        } catch (e) {
            console.error(e);
            toggleError(false);
            toggleLoading(true);
        }
        toggleLoading(false);
    }

    async function addUserAuthority(event) {
        toggleError(false);
        toggleLoading(true);
        event.preventDefault();
        try {
            await axiosHeader.post(`/authorities/users/${newAuthority.username}`, { authority: newAuthority.authority });
            setFormVisible(false);
            getAllAuthorities();
            getAllUsers();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function updateUserAuthority(event) {
        toggleError(false);
        toggleLoading(true);
        event.preventDefault();
        try {
            await axiosHeader.put(`/authorities/users/${updateAuthority.username}`, {
                oldAuthority: updateAuthority.oldAuthority,
                newAuthority: updateAuthority.newAuthority
            });
            setUpdateFormVisible(false);
            getAllAuthorities();
            getAllUsers();
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div className={styles['admin-page']}>
            <h1 className={styles['hero']}>Admin Page</h1>

            {loading && <p>Laden...</p>}
            {error && <ErrorMessage message="Er ging iets mis, probeer het later opnieuw." />}

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
                            <td><Link to={`/forums/${forum.id}`}>{forum.title}</Link></td>
                            <td>
                                <button type="submit" className={styles['admin-button']} onClick={() => deleteForum(forum.id)}>Delete</button>
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
                                <Link to={`/forums/${comment.forumDto.id}`}>
                                    {comment.text.slice(0, 60)}...
                                </Link>
                            </td>
                            <td>
                                <button type="submit" className={styles['admin-button']} onClick={() => deleteComment(comment.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Users</h2>
                <button type="button" className={styles['admin-button']} onClick={() => setFormVisible(true)}>Add Authority</button>
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
                        <button type="submit" className={styles['admin-button']}>Submit</button>
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
                            {user.dob && <td>{calculateAge(user.dob) + ' jaar'}</td>}
                            <td>{user.email}</td>
                            <td>{user.authorities[0]?.authority}</td>
                            <td>
                                <button type="submit" className={styles['admin-button']} onClick={() => deleteUser(user.username)}>Delete</button>
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
                                <button type="submit" className={styles['admin-button']} onClick={() => deleteReview(review.id, review.name)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Authorities</h2>
                <button type="button" className={styles['admin-button']} onClick={() => setUpdateFormVisible(true)}>Update Authority</button>
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
                                <button type="submit" className={styles['admin-button']} onClick={() => deleteUserAuthority(auth.username, auth.authority)}>Delete
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