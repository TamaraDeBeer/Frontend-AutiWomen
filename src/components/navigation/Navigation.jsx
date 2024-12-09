import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useContext, useEffect, useState} from "react";
import logo from '../../assets/logo/women.png';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function Navigation() {
    const navigate = useNavigate();
    const {isAuth, logout, user} = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuth && user) {
            axiosHeader.get(`/users/${user.username}/image`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Er is een fout opgetreden bij het ophalen van de gebruikersgegevens:", error);
                });
        }
    }, [isAuth, user]);

    return (
        <nav className={styles['outer-container']}>
            <div className={styles['navigation__outer-container']}>

                <NavLink to="/" className={styles['navigation-logo']}>
                    <img src={logo} alt="logo" className={styles['home-logo']}/>
                </NavLink>

                <ul className={`section-links ${styles['navigation__inner-container']}`}>
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
                            {userData && userData.profilePictureUrl ? (
                                <div className={styles['user-info']}>
                                    <Button onClick={() => navigate('/profile')}
                                            variant="profile">
                                        <img src={userData.profilePictureUrl} alt="Profielfoto"
                                             className={styles['profile-photo']}/>
                                        <span>{user.username}</span>
                                    </Button>
                                </div>
                            ) : (
                                <span>Welkom {user.username}</span>
                            )}
                            <Button type="button" onClick={logout} variant="logout">Log uit</Button>
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
