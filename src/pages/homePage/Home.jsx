import styles from './Home.module.css';
import hero from '../../assets/home-hero.jpg';
import benefit from '../../assets/benefit.svg';
import belle from '../../assets/profilePhoto/belle.jpg';
import moana from '../../assets/profilePhoto/moana.jpg';

import BenefitCard from "../../components/benefitCard/BenefitCard.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";
import Reviews from "../../components/reviews/Reviews.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import calculateAge from "../../helpers/calculateAge.jsx";

function Home() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [forums, setForums] = useState([]);

    useEffect(() => {
        async function fetchForums() {
            try {
                const response = await axios.get('http://localhost:1991/forums/sorted-by-likes');
                setForums(response.data.slice(0, 8));
            } catch (error) {
                console.error('Error fetching forums:', error);
            }
        }
        fetchForums();
    }, []);

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
                {forums.map((forum) => (
                    <PopulairForum
                        key={forum.id}
                        id={forum.id}
                        name={forum.name}
                        age={calculateAge(forum.age) + ' jaar'}
                        image={forum.userDto?.profilePictureUrl}
                        title={forum.title}
                    />
                ))}
            </div>
        </section>

        <section className={styles['section-reviews__outer-container']}>
            <h2 className={styles['section-title']}>Wat leden zeggen:</h2>
            <div className={styles['section-reviews__inner-container']}>
                <Reviews
                    className={styles['review']}
                    text="Ik kwam op aanraden van een vriendin op deze website. Ik ben al meerdere forums gestart en krijg veel goede tips van mede auties."
                    image={belle} name="Belle" age="36 jaar" diagnoseYear="2000"/>
                <Reviews
                    className={styles['review']}
                    text="Dankzij de blogs ontdek ik dat er veel meer van wie ik ben gerelateerd is aan autisme. Dit was best shocking maar heel fijn om er in de forums over te praten.."
                    image={moana} name="Moana" age="23 jaar" diagnoseYear="2020"/>
                <Reviews
                    className={styles['review']}
                    text="Dankzij de blogs ontdek ik dat er veel meer van wie ik ben gerelateerd is aan autisme. Dit was best shocking maar heel fijn om er in de forums over te praten.."
                    image={moana} name="Moana" age="23 jaar" diagnoseYear="2020"/>
                <Reviews
                    className={styles['review']}
                    text="Dankzij de blogs ontdek ik dat er veel meer van wie ik ben gerelateerd is aan autisme. Dit was best shocking maar heel fijn om er in de forums over te praten.."
                    image={moana} name="Moana" age="23 jaar" diagnoseYear="2020"/>
            </div>
        </section>

    </>);
}

export default Home;