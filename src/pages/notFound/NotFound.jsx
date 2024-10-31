import error from '../../assets/error.jpg';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="outer-container section__outer-container">
            <div className="inner-container section__inner-container">
                <h1>Auti-Women</h1>
                <h3>De plek waar autistische vrouwen elkaar helpen</h3>
                <img src={error} alt="Grappige Error Afbeelding" className="error-image"/>
                <p>Je hebt helaas geen toestemming om deze pagina te bezoeken</p>
                <div>
                    <Button type="button"
                            onClick={() => navigate('/register')}
                    >Word gratis lid</Button>
                </div>


            </div>
        </section>
    );
}

export default NotFound;