import styles from './Navigation.module.css';
import {NavLink} from 'react-router-dom';

// import React from 'react';

function Navigation() {

    return (
        <nav className={styles['navigation__outer-container']}>
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

            <h3>Button</h3>
        </nav>
    );
}

export default Navigation;