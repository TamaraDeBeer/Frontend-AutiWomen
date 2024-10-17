import styles from './NotFound.module.css';
import error from '../../assets/error.jpg';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-error__inner-container']}`}>
                <h1>Auti-Women</h1>
                <h3>De plek waar autistische vrouwen elkaar helpen</h3>
                <img src={error} alt="Grappige Error Afbeelding" className={styles['section-error__image']}/>
                <p>Je hebt helaas geen toestemming om deze pagina te bezoeken</p>
                <div className={styles['button-register']}>
                    <Button type="button"
                            onClick={() => navigate('/register')}
                    >Word gratis lid</Button>
                </div>


            </div>
        </section>
    );
}

export default NotFound;