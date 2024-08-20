import styles from './ForumHome.module.css';
import Button from "../../components/button/Button.jsx";
import search from "../../assets/logo/search.png";
import {useNavigate} from "react-router-dom";
import ForumPostShort from "../../components/forumPostShort/ForumPostShort.jsx";
import anna from '../../assets/profilePhoto/anna.jpg';

function ForumHome() {
    const navigate = useNavigate();

  return (<>
      <section className={styles['outer-container']}>
          <div className={`${styles['inner-container']} ${styles['section-forum__inner-container']}`}>
              <h1>Auti-Women Forum</h1>
              <h2>Deel je problemen, geef advies en wees respectvol</h2>
              <div>
                  <Button type="button" className={styles['button-forum']}
                          onClick={() => navigate('/ForumCreate')}
                  >Schrijf een forum</Button>
              </div>
              <div>
                  <button className={styles['section-forum__button-search']}>Zoeken in alle forums.. <img src={search} alt="search logo"/>
                  </button>
              </div>
          </div>
        </section>

        <section className={styles['section-forum__main']}>
            <section className={styles['section-forum__posts-short']}>
                <h3>Populair Forum Posts</h3>
                <ForumPostShort
                    image={anna}
                    name="Anna"
                    age="33 jaar"
                    title="Hoe kan ik structuur in mijn dag krijgen?"
                    text="Ik struggle momenteel heel erg met een dagstructuur. Ik heb vooral moeite met naar bed gaan. Ik wil om 1 uur gaan slapen, maar dan blijf ik toch wakker tot 3 uur. Uiteraard kom ik dan de volgende dag niet om 8 uur mijn bed uit."
                    likes="4"
                    comments="13"
                    views="86"
                    lastReaction="06-05-2024"
                />
            </section>


            <section className={styles['section-forum__sidebar']}>
                <h3>Component Populair Topics</h3>
            </section>

        </section>



  </>);
}

export default ForumHome;