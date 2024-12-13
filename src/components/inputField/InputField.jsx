import styles from './InputField.module.css';

function InputField({ inputId, inputLabel, inputType, inputName, validationRules, register, errors }) {
    return (
        <>

            <label className={styles['label-field']} htmlFor={inputId}>
                {inputLabel}
                <input className={styles['input-field']}
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default InputField;