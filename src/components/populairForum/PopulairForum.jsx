import styles from './PopulairForum.module.css';
import {Link} from "react-router-dom";

function PopulairForum({id, name, age, image, title}) {
    return (
        <Link to={`/forums/${id}`} className={styles['forum-link']}>
        <article className={styles['section-forum__card']}>
            <h4>{name} ({age})</h4>
            <img className={styles.image} src={image} alt={name}/>
            <h3 className={styles.title}>{title}</h3>
        </article>
        </Link>
    );
}

export default PopulairForum;