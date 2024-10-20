import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
    return (
        <section className={styles['terms-page']}>

            <section className={styles['inner-container']}>
                <h1>Algemene Voorwaarden</h1>
                <p>Deze algemene voorwaarden beschrijven de regels en voorschriften voor het gebruik van onze website.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Inleiding</h2>
                <p>Door deze website te bezoeken, gaan we ervan uit dat u deze algemene voorwaarden accepteert. Gebruik onze website niet als u niet akkoord gaat met alle voorwaarden die op deze pagina worden vermeld.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Licentie</h2>
                <p>Tenzij anders vermeld, bezitten wij en/of onze licentiegevers de intellectuele eigendomsrechten voor al het materiaal op de website. Alle intellectuele eigendomsrechten zijn voorbehouden.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Gebruikersinhoud</h2>
                <p>U verleent ons een niet-exclusieve licentie om uw inhoud te gebruiken, reproduceren, bewerken en autoriseren om anderen te gebruiken, reproduceren en bewerken in alle vormen, formaten of media.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Beperking van aansprakelijkheid</h2>
                <p>In geen geval zullen wij aansprakelijk zijn voor enige schade die voortvloeit uit of in verband staat met uw gebruik van deze website.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Wijzigingen</h2>
                <p>Wij behouden ons het recht voor om deze voorwaarden op elk moment te herzien. Door deze website te gebruiken, gaat u ermee akkoord gebonden te zijn aan de huidige versie van deze algemene voorwaarden.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Contactinformatie</h2>
                <p>Als u vragen heeft over deze algemene voorwaarden, kunt u contact met ons opnemen via:</p>
                <p>Email: tamara@hotmail.com</p>
            </section>
        </section>
    );
}

export default TermsAndConditions;