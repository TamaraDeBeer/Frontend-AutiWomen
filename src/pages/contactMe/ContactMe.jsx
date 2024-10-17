import styles from './ContactMe.module.css';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function ContactMe() {
    const navigate = useNavigate();

    return (
        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-error__inner-container']}`}>
                <h1>Auti-Women</h1>
                <h3>De plek waar autistische vrouwen elkaar helpen</h3>

                <section className={styles['contact']}>
                    <h2>Neem contact met mij op</h2>
                    <p>Ik ben Tamara, en ik heb deze website gemaakt. Heb je vragen, tips of wat dan ook neem gerust contact met mij op door een mail te sturen naar tamara.debeer@hotmail.com</p>
                </section>


                <div className={styles['button-register']}>
                    <Button type="button"
                            onClick={() => navigate('/register')}
                    >Word gratis lid</Button>
                </div>


            </div>
        </section>
    );
}

export default ContactMe;