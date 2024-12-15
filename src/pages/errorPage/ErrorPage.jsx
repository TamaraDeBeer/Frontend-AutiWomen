import error from '../../assets/error.jpg';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <section className="outer-container section__outer-container">
            <div className="inner-container section__inner-container">
                <h1>Auti-Women</h1>
                <h3>De plek waar autistische vrouwen elkaar helpen</h3>
                <img src={error} alt="Grappige Error Afbeelding" className="error-image"/>
                <p>Sorry je moet ingelogd zijn om een forum te kunnen schrijven</p>
                <div>
                    <Button type="button"
                            onClick={() => navigate('/register')}
                    >Word gratis lid</Button>
                </div>


            </div>
        </section>
    );
}

export default ErrorPage;