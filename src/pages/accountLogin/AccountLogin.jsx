import styles from "../homePage/Home.module.css";
import hero from "../../assets/home-hero.jpg";

function AccountLogin() {
    return (
        <div>
            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                    <figure className={styles['section-hero__inner-container-image']}>
                        <img src={hero} alt="Hero"/>
                    </figure>

                    <div className={styles['section-hero__inner-container-text']}>
                        <h1>Auti-Women</h1>
                        <h2 className={styles['section-hero__subtitle']}>De plek waar autistische vrouwen elkaar helpen</h2>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default AccountLogin;