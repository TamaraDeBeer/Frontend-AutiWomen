import styles from './Navigation.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from "../button/Button.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {useContext} from "react";

// import React from 'react';

function Navigation() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);

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

                <div>

                    {isAuth ?
                        <Button type="button"
                                onClick={logout}
                        >Log uit</Button>
                        :
                        <Button type="button"
                                onClick={() => navigate('/login')}
                        >Log in</Button>
                    }



                </div>
            </div>
        </nav>
    );
}

export default Navigation;