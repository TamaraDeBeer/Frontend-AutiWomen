import styles from './Button.module.css';

// eslint-disable-next-line react/prop-types
function Button({ type, children, onClick, disabled, variant = 'primary' }) {
    const buttonClass = `${styles.button} ${styles[`button-${variant}`]}`;

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
}

export default Button;