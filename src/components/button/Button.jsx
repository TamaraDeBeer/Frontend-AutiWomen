import styles from './Button.module.css';

// eslint-disable-next-line react/prop-types
function Button({ type, children, onClick, disabled}) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
}

export default Button;