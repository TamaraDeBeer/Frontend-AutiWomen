import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
    return (
        <section className={styles['privacy-page']}>

            <section className={styles['inner-container']}>
                <h1>Privacy Verklaring</h1>
                <p>Deze privacyverklaring legt uit hoe wij omgaan met uw persoonlijke gegevens wanneer u onze website
                    bezoekt.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Welke gegevens worden verzameld</h2>
                <p>Wij kunnen de volgende gegevens verzamelen:</p>
                <ul>
                    <li>Naam</li>
                    <li>Contactinformatie inclusief e-mailadres</li>
                    <li>Demografische informatie zoals postcode, voorkeuren en interesses</li>
                    <li>Andere informatie relevant voor klantonderzoeken en/of aanbiedingen</li>
                </ul>
            </section>

            <section className={styles['inner-container']}>
                <h2>Hoe worden de gegevens gebruikt</h2>
                <p>Wij gebruiken deze gegevens om uw behoeften beter te begrijpen en u een betere service te bieden, en
                    in het bijzonder om de volgende redenen:</p>
                <ul>
                    <li>Interne administratie</li>
                    <li>Verbetering van onze producten en diensten</li>
                    <li>Periodieke promotionele e-mails over nieuwe producten, speciale aanbiedingen of andere
                        informatie waarvan wij denken dat u deze interessant vindt
                    </li>
                </ul>
            </section>

            <section className={styles['inner-container']}>
                <h2>Delen van gegevens</h2>
                <p>Wij zullen uw persoonlijke gegevens niet verkopen, distribueren of verhuren aan derden tenzij wij uw
                    toestemming hebben of wettelijk verplicht zijn dit te doen.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Beveiliging van gegevens</h2>
                <p>Wij zijn toegewijd aan het waarborgen van de veiligheid van uw gegevens. Om ongeoorloofde toegang of
                    openbaarmaking te voorkomen, hebben wij geschikte fysieke, elektronische en bestuurlijke procedures
                    ingesteld om de gegevens die wij online verzamelen te beschermen en beveiligen.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Rechten van gebruikers</h2>
                <p>U kunt ervoor kiezen om de verzameling of het gebruik van uw persoonlijke gegevens te beperken. U
                    kunt ook verzoeken om details van persoonlijke informatie die wij over u bewaren.</p>
            </section>

            <section className={styles['inner-container']}>
                <h2>Contactinformatie</h2>
                <p>Als u vragen heeft over deze privacyverklaring, kunt u contact met ons opnemen via:</p>
                <p>Email: tamara@hotmail.com</p>
            </section>
        </section>
    );
}

export default PrivacyPolicy;