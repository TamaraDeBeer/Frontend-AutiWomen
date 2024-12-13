import {useEffect, useState} from 'react';
import styles from './ForumHome.module.css';
import Button from "../../components/button/Button.jsx";
import search from "../../assets/logo/search.png";
import {useNavigate} from "react-router-dom";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import axios from 'axios';
import ErrorMessage from "../../components/errorMessage/ErrorMessage.jsx";
import calculateAge from "../../helpers/calculateAge.jsx";
import PopulairTopics from "../../components/populairTopics/PopulairTopics.jsx";
import createDateToString from "../../helpers/createDateToString.jsx";
import axiosPublic from "../../helpers/axiosPublic.jsx";

function ForumHome() {
    const navigate = useNavigate();
    const [forums, setForums] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [sliderOption, setSliderOption] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAllForums();
    }, [sliderOption]);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function fetchAllForums() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        const endpoint = sliderOption === 'newest' ? 'http://localhost:1991/forums/sorted-by-date' : 'http://localhost:1991/forums/sorted-by-likes';
        try {
            const response = await axios.get(endpoint, signal);
            setForums(response.data);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    async function searchForums() {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const response = await axiosPublic.get(`/forums/search`, {
                params: { searchQuery }, signal
            });
            setForums(response.data);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <section className="outer-container">
                <div className={`inner-container ${styles['section-forum__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Deel je problemen, geef advies en wees respectvol</h2>
                    <div>
                        <Button type="button" className={styles['button-forum']}
                                onClick={() => navigate('/forum/create')}
                        >Schrijf een forum</Button>
                    </div>
                    <div className={styles['section-forum__search-container']}>
                        <input
                            type="text"
                            className={styles['section-forum__input-search']}
                            placeholder="Zoeken in alle forums.."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="button" className={styles['section-forum__button-search']} onClick={searchForums}>
                            <img src={search} alt="search logo"/>
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles['section-forum__main']}>
                <section className={styles['section-forum__posts-short']}>
                    <div className={styles['slider']}>
                        <button
                            type="button"
                            onClick={() => setSliderOption('newest')}
                            className={`${styles['button']} ${styles['newest']} ${sliderOption === 'newest' ? styles['active'] : ''}`}
                        >
                            Nieuwste
                        </button>
                        <button
                            type="button"
                            onClick={() => setSliderOption('trending')}
                            className={`${styles['button']} ${styles['trending']} ${sliderOption === 'trending' ? styles['active'] : ''}`}
                        >
                            Trending
                        </button>
                    </div>

                    {loading && <p>Laden...</p>}
                    {error && <ErrorMessage message="Er is iets misgegaan bij het ophalen van de forums. Probeer het opnieuw."/>}
                    {forums.map((forum) => {
                        return <ForumPostShort
                            key={forum.id}
                            forumId={forum.id}
                            image={forum.userDto?.profilePictureUrl}
                            name={forum.name}
                            age={calculateAge(forum.dob) + ' jaar'}
                            title={forum.title}
                            date={createDateToString(forum.date)}
                            text={forum.text.split(' ').slice(0, 50).join(' ')}
                            link={`/forums/${forum.id}`}
                            likesCount={forum.likesCount}
                            commentsCount={forum.commentsCount}
                            viewsCount={forum.viewsCount}
                            lastReaction={forum.lastReaction ? createDateToString(forum.lastReaction) : 'Nog geen reacties'}
                        />
                    })}
                </section>

                <section className={styles['section-forum__sidebar']}>
                    <PopulairTopics/>
                </section>
            </section>
        </>
    );
}

export default ForumHome;
