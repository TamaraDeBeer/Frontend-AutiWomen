import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <h1>Welcome to Home Page</h1>
            <p>Click on the links above to navigate</p>
        </div>
    );
}

export default Home;