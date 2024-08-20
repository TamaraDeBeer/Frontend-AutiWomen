import styles from './ForumPostShort.module.css';
import likes1 from "../../assets/logo/likes.png";
import comments1 from "../../assets/logo/comments.png";
import views1 from "../../assets/logo/views.png";


// eslint-disable-next-line react/prop-types
function ForumPostShort({image, name, age, title, text, likes, comments, views, lastReaction}) {
    return (
        <article className={styles['section-forum__card']}>
            <div>
                <img src={image} alt={name}/>
                <div>
                    <h4>{name} ({age})</h4>
                    <h3>{title}</h3>
                    <p>{text} ... lees meer</p>
                    {/*lees meer wordt een link naar de specifieke post*/}
                    <div>
                        <p><img src={likes1} alt="Likes Logo"/>{likes}</p>
                        <p><img src={comments1} alt="Comments Logo"/>{comments}</p>
                        <p><img src={views1} alt="Views Logo"/>{views}</p>
                    </div>
                    <p>Laatste reactie: {lastReaction}</p>
                </div>
            </div>
        </article>
    );
}

export default ForumPostShort;