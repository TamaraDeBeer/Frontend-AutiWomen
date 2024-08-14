import styles from './Home.module.css';
import hero from '../../assets/home-hero.jpg';
import benefit from '../../assets/benefit.svg';
import BenefitCard from "../../components/benefitCard/BenefitCard.jsx";

function Home() {
    return (<>

        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                <figure className={styles['section-hero__inner-container-image']}>
                    <img src={hero} alt="Hero"/>
                </figure>

                <div className={styles['section-hero__inner-container-text']}>
                    <h1>Auti-Women</h1>
                    <h2>De plek waar autistische vrouwen elkaar helpen</h2>
                </div>
            </div>

        </section>

        <section className={`${styles['outer-container']} ${styles['section-benefits__outer-container']}`}>
            <div className={styles['inner-container']}>
                <h2>Wat bieden wij?</h2>
                <div className={styles['section-benefits__inner-container']}>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Community"
                                 text="Ontmoet andere autistische vrouwen en deel ervaringen"/>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Support"
                                 text="Krijg steun van andere vrouwen en help elkaar"/>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Advies"
                                 text="Ontvang advies en tips van andere vrouwen"/>
                </div>
                <h2>Button</h2>
            </div>
        </section>

    </>);
}

export default Home;