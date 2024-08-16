import styles from './Footer.module.css';
import tamara from '../../assets/profilePhoto/tamara.jpg';
import instagram from '../../assets/logo/instagram.png';
import linkedin from '../../assets/logo/linkedin.png';
import facebook from '../../assets/logo/facebook.png';
import copyright from '../../assets/logo/copyright.png';


function Footer() {
    return (
        <footer>
            <div className={styles['outer-container']}>
            <div className={styles['inner-container']}>
                <section className={styles['section-about-me']}>
                    <span>
                <img src={tamara} alt="Tamara" className={styles.image}/>
                        </span>
                    <div>
                        <p className={styles['section-about-me__about-me']}>Over mij</p>
                        <p className={styles['section-about-me__text']}>Ik ben Tamara. Toen ik 30 was kwam ik er pas
                            achter dat ik autisme heb. Ik ken weinig mensen met dezelfde diagnose (waarschijnlijk meer
                            dan ik denk) dus bedacht ik deze website zodat we elkaar kunnen helpen.
                        </p>
                    </div>

                </section>

                <section>
                    <ul className={styles['section-links']}>
                        <li>Populaire Blogs</li>
                        <li>Populaire Forums</li>
                        <li>Over mij</li>
                        <li>Contact opnemen</li>
                        <li>Privacy Verklaring</li>
                        <li>Algemene Voorwaarden</li>
                    </ul>

                </section>

                <section className={styles['section-media']}>
                    <h3>Registreren</h3>
                    <h3>Zoeken</h3>
                    <div>
                        <img src={facebook} alt="Facebook Logo"/>
                        <img src={linkedin} alt="LinkedIn Logo"/>
                        <img src={instagram} alt="Instagram Logo"/>
                    </div>

                </section>
            </div>
            </div>

            <section className={styles.subfooter}>
                <div className={styles['subfooter-content']}>
            <img src={copyright} alt="Copyright Logo"/>
            <p>2024 Auti-Women</p>
                </div>
            </section>

        </footer>
    );
}

export default Footer;