import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";

// import React from 'react';

function Navigation() {
    const navigate = useNavigate();
    const {isAuth, logout, user} = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (isAuth && user) {
            axios.get(`http://localhost:1991/users/${user.username}/image`)
                .then(response => {
                    console.log(response.data);
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Er is een fout opgetreden bij het ophalen van de gebruikersgegevens:", error);
                });
        }
    }, [isAuth, user]);

    return (
        <nav id="navigation" className={styles['outer-container']}>
            <div className={styles['navigation__outer-container']}>
                <span className={styles['navigation-logo']}>
                    <h3>LOGO</h3>
                </span>
                <ul className={styles['navigation__inner-container']}>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to={"/"}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to={"/blog"}>Blog</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to={"/articles"}>Artikelen</NavLink>
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
                                    <img src={userData.profilePictureUrl} alt="Profielfoto" className={styles['profile-photo']} />
                                    <span>Welkom, {user.username}</span>
                                </div>
                            ) : (
                                <span>Welkom {user.username}</span>
                            )}
                            <Button type="button" onClick={logout}>Log uit</Button>
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