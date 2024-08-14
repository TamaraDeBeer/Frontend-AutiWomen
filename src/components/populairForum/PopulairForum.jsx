import styles from './PopulairForum.module.css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function PopulairForum({name, age, image, title}) {
    return (
        <article className={styles['section-forum__card']}>
            <h4>{name} ({age})</h4>
            <img className={styles.image} src={image} alt={name}/>
            <h3 className={styles.title}>{title}</h3>
        </article>
    );
}

export default PopulairForum;