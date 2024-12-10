import styles from './Home.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import hero from '../../assets/home-hero.jpg';
import benefit from '../../assets/benefit.svg';

import BenefitCard from "../../components/benefitCard/BenefitCard.jsx";
import PopulairForum from "../../components/populairForum/PopulairForum.jsx";
import Reviews from "../../components/reviews/Reviews.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import calculateAge from "../../helpers/calculateAge.jsx";
import useAxios from "../../hooks/useAxios.jsx";

function Home() {
    const navigate = useNavigate();
    const { data: forums, loading: forumsLoading, error: forumsError } = useAxios('/forums/sorted-by-likes');
    const { data: reviews, loading: reviewsLoading, error: reviewsError } = useAxios('/reviews');

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        arrows: false,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <>
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
                    {forumsLoading && <p>Loading...</p>}
                    {forumsError && <p>Error loading forums</p>}
                    {forums && forums.map((forum) => (
                        <PopulairForum
                            key={forum.id}
                            id={forum.id}
                            name={forum.name}
                            age={calculateAge(forum.dob) + ' jaar'}
                            image={forum.userDto?.profilePictureUrl}
                            title={forum.title}
                        />
                    ))}
                </div>
            </section>

            <section className={styles['section-reviews__outer-container']}>
                <h2 className={styles['section-title']}>Wat leden zeggen:</h2>
                <div className={styles['section-reviews__inner-container']}>
                    <Slider {...settings}>
                        {reviewsLoading && <p>Loading...</p>}
                        {reviewsError && <p>Error loading reviews</p>}
                        {reviews && reviews.map((review) => (
                            <div key={review.id} className={styles['review']}>
                                <Reviews
                                    image={review.profilePictureUrl}
                                    name={review.name}
                                    text={review.review}
                                    age={calculateAge(review.dob) + ' jaar'}
                                    diagnoseYear={review.diagnoseYear}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    );
}

export default Home;