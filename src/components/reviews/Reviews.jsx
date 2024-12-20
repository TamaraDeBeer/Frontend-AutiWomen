import styles from './Reviews.module.css';
import React from 'react';

function Reviews({text, image, name, age, diagnoseYear}) {
    return (
        <article className={styles['section-forum__card']}>
            <p className={styles.text}>{text}</p>

            <div className={styles['section-forum__profile-card']}>
            <img className={styles.image} src={image} alt={name}/>
                <div className={styles.profile}>
            <h4>{name} ({age})</h4>
                    <h4 className={styles.diagnose}>Autisme diagnose in {diagnoseYear}</h4>
                </div>
            </div>

        </article>
    );
}

export default Reviews;