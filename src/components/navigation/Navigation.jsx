import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useContext} from "react";
import {UserContext} from "../../context/UserProvider.jsx";

function Navigation() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);
    const { user } = useContext(UserContext);

    return (
        <nav className={styles['outer-container']}>
            <div className={styles['navigation__outer-container']}>

                <span className={styles['navigation-logo']}>
                    <h3>LOGO</h3>
                </span>

                <ul className={styles['navigation__inner-container']}>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to={"/"}>Home</NavLink>
                    </li>
                    <li className={styles['navigation__inner-container--forum']}>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to={"/forum"}>Forum</NavLink>
                    </li>
                </ul>

                <div className={styles['user-actions']}>

                    {isAuth ? (
                        <>
                            {user && user.profilePicture ? (
                                <div className={styles['user-info']}>
                                    <button onClick={() => navigate('/profile')}
                                            className={styles['profile-photo-button']}>
                                        <img src={user.profilePicture} alt="Profile"
                                             className={styles['profile-photo']}/>
                                        <span>{user.username}</span>
                                    </button>
                                </div>
                            ) : (
                                <span>Welkom {user.username}</span>
                            )}
                            <button type="button" onClick={logout} className={styles['logout-button']}>Log uit</button>
                        </>
                    ) : (
                        <Button type="button" onClick={() => navigate('/login')}>Log in</Button>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navigation;