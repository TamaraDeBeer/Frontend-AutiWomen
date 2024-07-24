import styles from './Home.module.css';
import hero from '../../assets/home-hero.jpg';

function Home() {
    return (

        <section className={styles['section-hero__outer-container']}>

            <div className={styles['section-hero__inner-container-image']}>
                <img src={hero} alt="Hero" />
            </div>

            <div className={styles['section-hero__inner-container-text']}>
            <h1>Auti-Women</h1>
            <h2>De plek waar autistische vrouwen elkaar helpen</h2>
            </div>

        </section>
    );
}

export default Home;