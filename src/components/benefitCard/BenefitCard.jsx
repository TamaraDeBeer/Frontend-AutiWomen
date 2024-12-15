import styles from './BenefitCard.module.css';

function BenefitCard({image, imageAlt, title, text}) {
    return (
        <article className={styles['section-benefits__card']}>
            <img src={image} alt={imageAlt}/>
            <h3>{title}</h3>
            <p>{text}</p>
        </article>
    );
}

export default BenefitCard;