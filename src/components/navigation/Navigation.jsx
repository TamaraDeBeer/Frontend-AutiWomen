import styles from './Navigation.module.css';

function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><a href="/">Home</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;