import styles from './ForumPost.module.css';
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import ForumPostLong from "../../components/forumPostLong/ForumPostLong.jsx";
import elsa from "../../assets/profilePhoto/elsa.jpg";

function ForumPost() {
    const navigate = useNavigate();

    return (<>

        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                <h1>Auti-Women Forum</h1>
                <h2>Deel je problemen, geef advies en wees respectvol</h2>
                <div>
                    <Button type="button" className={styles['button-forum']}
                            onClick={() => navigate('/forum/create')}
                    >Schrijf een forum</Button>
                </div>
            </div>
        </section>

        <section className={`${styles['outer-container']} ${styles['section-forum__main']}`}>
            <section className={styles['section-forum__posts-long']}>
                <ForumPostLong
                    title="Hoe kan ik structuur in mijn dag krijgen?"
                    image={elsa}
                    name="Elsa"
                    age="33 jaar"
                    date="04-05-2024"
                    lastReaction="06-05-2024"
                    text="Ik struggle momenteel heel erg met een dagstructuur. Ik heb vooral moeite met naar bed gaan. Ik wil om 1 uur gaan slapen, maar dan blijf ik toch wakker tot 3 uur. Uiteraard kom ik dan de volgende dag niet om 8 uur mijn bed uit.
                        Ik vind gewoon de avond heel erg fijn, het is eindelijk rustig & stil. Mijn hoofd raast alsnog wel door maar vele malen minder want er zijn geen verplichtingen meer op deze dag. Herkennen jullie dit? Of heb jij dit overwonnen? Ik lees graag hoe je dit hebt gedaan en wat heeft geholpen (of wat juist niet)."
                    likes="4"
                    comments="13"
                    views="86"
                />

                <p>LIJN</p>

                <h3>slider nieuwste / trending</h3>

                <p>REACTIES</p>

                <h4>POST REACTIE</h4>


            </section>

            <section className={styles['section-forum__sidebar']}>
                <h2>Component Populaire onderwerpen</h2>
            </section>

        </section>


    </>);
}

export default ForumPost;