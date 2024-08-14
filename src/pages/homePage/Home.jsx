import styles from './Home.module.css';
import hero from '../../assets/home-hero.jpg';
import benefit from '../../assets/benefit.svg';
import anna from '../../assets/profilePhoto/anna.jpg';
import ariel from '../../assets/profilePhoto/ariel.jpg';
import aurora from '../../assets/profilePhoto/aurora.jpg';
import elsa from '../../assets/profilePhoto/elsa.jpg';
import jane from '../../assets/profilePhoto/jane.jpg';
import nala from '../../assets/profilePhoto/nala.jpg';
import sarabi from '../../assets/profilePhoto/sarabi.jpg';
import tiana from '../../assets/profilePhoto/tiana.jpg';


import BenefitCard from "../../components/benefitCard/BenefitCard.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";

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

        <section className={`${styles['outer-container']} ${styles['section-forums__outer-container']}`}>
            <div className={styles['inner-container']}>
                <h2>Populaire Forums</h2>
                <div className={styles['section-forums__inner-container']}>
                    <PopulairForum name="Aurora" age="62 jaar" image={aurora} title="Waar begin jij in het huishouden?"/>
                    <PopulairForum name="Jane" age="23 jaar" image={jane} title="Maar je lijkt helemaal niet autistisch..."/>
                    <PopulairForum name="Ariel" age="29 jaar" image={ariel} title="Hoe bereid je je voor op vakantie?"/>
                    <PopulairForum name="Tiana" age="70 jaar" image={tiana} title="Wat kan ik met mijn kleinkinderen doen?"/>
                    <PopulairForum name="Elsa" age="33 jaar" image={elsa} title="Hoe kan ik structuur in mijn dag krijgen?"/>
                    <PopulairForum name="Anna" age="43 jaar" image={anna} title="Ik kan 's nachts niet slapen..."/>
                    <PopulairForum name="Nala" age="18 jaar" image={nala} title="Kan ik Pabo studeren als autist?"/>
                    <PopulairForum name="Sarabi" age="38 jaar" image={sarabi} title="Hoe stop ik met zoveel tv kijken?!"/>
                </div>
            </div>

        </section>

    </>);
}

export default Home;