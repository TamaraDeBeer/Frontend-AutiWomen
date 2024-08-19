// eslint-disable-next-line react/prop-types
function InputField({ inputId, inputLabel, inputType, inputName, validationRules, register, errors }) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {/* eslint-disable-next-line react/prop-types */}
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default InputField;