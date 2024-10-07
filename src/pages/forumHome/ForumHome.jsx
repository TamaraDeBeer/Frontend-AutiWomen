import styles from './ForumHome.module.css';
import Button from "../../components/button/Button.jsx";
import search from "../../assets/logo/search.png";
import {useNavigate} from "react-router-dom";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import anna from '../../assets/profilePhoto/anna.jpg';
import axios from 'axios';
import {useEffect, useState} from "react";
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";

function ForumHome() {
    const navigate = useNavigate();
    const [forums, setForums] = useState([]);
    const [error, toggleError] = useState(false);


    useEffect(() => {
        void fetchAllForums();
    }, []);

        async function fetchAllForums() {
            toggleError(false);

            try {
                const response = await axios.get('http://localhost:1991/forums');
                setForums(response.data);
                console.log(response.data);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

    return (<>
        <section className="outer-container">
            <div className={`inner-container ${styles['section-forum__inner-container']}`}>
                <h1>Auti-Women Forum</h1>
                <h2>Deel je problemen, geef advies en wees respectvol</h2>
                <div>
                    <Button type="button" className={styles['button-forum']}
                            onClick={() => navigate('/forum/create')}
                    >Schrijf een forum</Button>
                </div>
                <div>
                    <button className={styles['section-forum__button-search']}>Zoeken in alle forums.. <img src={search}
                                                                                                            alt="search logo"/>
                    </button>
                </div>
            </div>
        </section>

        <section className={styles['section-forum__main']}>
            <section className={styles['section-forum__posts-short']}>

                <div>
                    <h3>slider nieuwste / trending</h3>
                </div>

                {forums.map((forum) => {
                    return <ForumPostShort
                        key={forum.id}
                        image={anna}
                        name={forum.name}
                        age={calculateAge(forum.age) + ' jaar'}
                        title={forum.title}
                        text={forum.text.split(' ').slice(0, 40).join(' ')}
                        link={`/forum/${forum.id}`}
                        likes={forum.likes}
                        comments={forum.comments}
                        views={forum.views}
                        lastReaction={forum.lastReaction}
                    />
                })}
                {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van de data. Probeer het opnieuw." />}

            </section>

            <section className={styles['section-forum__sidebar']}>
                <h2>Populaire Onderwerpen</h2>
                <ul className={styles['section-forum__sidebar-list']}>
                    <li>Fysieke Gezondheid</li>
                    <li>Mentale Gezondheid</li>
                    <li>Huishouden</li>
                    <li>Werk</li>
                    <li>School</li>
                    <li>Relaties</li>
                    <li>Vriendschappen</li>
                    <li>Rouw</li>
                </ul>
            </section>

        </section>


    </>);
}

export default ForumHome;