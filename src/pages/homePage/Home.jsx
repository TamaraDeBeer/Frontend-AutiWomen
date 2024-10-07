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
import belle from '../../assets/profilePhoto/belle.jpg';
import moana from '../../assets/profilePhoto/moana.jpg';


import BenefitCard from "../../components/benefitCard/BenefitCard.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";
import Reviews from "../../components/reviews/Reviews.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (<>

        <section className="outer-container">
            <div className={styles['section-hero__inner-container']}>
                <figure className={styles['section-hero__inner-container-image']}>
                    <img src={hero} alt="Hero"/>
                </figure>

                <div className={styles['section-hero__inner-container-text']}>
                    <h1>Auti-Women</h1>
                    <h2 className={styles['section-hero__subtitle']}>De plek waar autistische vrouwen elkaar helpen</h2>
                </div>
            </div>
        </section>

        <section className={styles['section-benefits__outer-container']}>
                <h2 className={styles['section-title']}>Wat bieden wij?</h2>
                <div className={styles['section-benefits__inner-container']}>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Community"
                                 text="Ontmoet andere autistische vrouwen en deel ervaringen"/>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Support"
                                 text="Krijg steun van andere vrouwen en help elkaar"/>
                    <BenefitCard image={benefit} imageAlt="benefit" title="Advies"
                                 text="Ontvang advies en tips van andere vrouwen"/>
                </div>
                <div className={styles['button-register']}>
                    <Button type="button"
                            onClick={() => navigate('/register')}
                    >Word gratis lid</Button>
                </div>
        </section>

        <section className={styles['section-forums']}>
                <h2 className={styles['section-title']}>Populaire Forums</h2>
                <div className={styles['section-forums__inner-container']}>
                    <PopulairForum name="Aurora" age="62 jaar" image={aurora}
                                   title="Waar begin jij in het huishouden?"/>
                    <PopulairForum name="Jane" age="23 jaar" image={jane}
                                   title="Maar je lijkt helemaal niet autistisch..."/>
                    <PopulairForum name="Ariel" age="29 jaar" image={ariel} title="Hoe bereid je je voor op vakantie?"/>
                    <PopulairForum name="Tiana" age="70 jaar" image={tiana}
                                   title="Wat kan ik met mijn kleinkinderen doen?"/>
                    <PopulairForum name="Elsa" age="33 jaar" image={elsa}
                                   title="Hoe kan ik structuur in mijn dag krijgen?"/>
                    <PopulairForum name="Anna" age="43 jaar" image={anna} title="Ik kan 's nachts niet slapen..."/>
                    <PopulairForum name="Nala" age="18 jaar" image={nala} title="Kan ik Pabo studeren als autist?"/>
                    <PopulairForum name="Sarabi" age="38 jaar" image={sarabi}
                                   title="Hoe stop ik met zoveel tv kijken?!"/>
                </div>
        </section>

        <section className={styles['section-reviews__outer-container']}>
                <h2 className={styles['section-title']}>Wat leden zeggen:</h2>
                <div className={styles['section-reviews__inner-container']}>
                    <Reviews text="Ik kwam op aanraden van een vriendin op deze website. Ik ben al meerdere forums gestart en krijg veel goede tips van mede auties." image={belle} name="Belle" age="36 jaar" diagnoseYear="2000"/>
                    <Reviews text="Dankzij de blogs ontdek ik dat er veel meer van wie ik ben gerelateerd is aan autisme. Dit was best shocking maar heel fijn om er in de forums over te praten.." image={moana} name="Moana" age="23 jaar" diagnoseYear="2020"/>
                </div>
        </section>

    </>);
}

export default Home;