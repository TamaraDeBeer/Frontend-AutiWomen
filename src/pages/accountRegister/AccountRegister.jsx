import styles from './AccountRegister.module.css';
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {Link} from "react-router-dom";

function AccountRegister() {
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: "",
            dob: "",
        }
    });

    const watchSelectedAutism = watch('autism-question');

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (<>

        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-register__inner-container']}`}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles['register-form']}>

                    <InputField
                        inputId="name-field"
                        inputLabel="Naam:"
                        inputType="text"
                        inputName="name"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Naam is verplicht",
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        inputId="gender-field"
                        inputLabel="Geslacht:"
                        inputType="text"
                        inputName="gender"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Geslacht is verplicht",
                            },
                            validate: (value) => value.includes('vrouw') || "Sorry, alleen vrouwen zijn welkom op deze website",
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        inputId="dob-field"
                        inputLabel="Geboortedatum:"
                        inputType="date"
                        inputName="dob"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Geboortedatum is verplicht",
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <label htmlFor="autism">
                        <p className={styles['section-register__autism']}>Autisme?</p>
                        <select id="autism" {...register("autism-question", {
                            required: {
                                value: true,
                                message: "Maak een keuze",
                            },
                        })}>
                            <option value="" disabled selected>-- Selecteer een optie --</option>
                            <option value="Ja">Ja</option>
                            <option value="Nee">Nee</option>
                            <option value="Vermoeden">Vermoeden</option>
                        </select>
                        {errors['autism-question'] && <p>{errors['autism-question'].message}</p>}
                    </label>

                    {watchSelectedAutism === "Ja" &&
                        <label htmlFor="diagnoses-year">
                            <p className={styles['section-register__autism']}>In welk jaartal heb je de diagnose
                                gekregen?</p>
                            <input
                                type="number"
                                name="year"
                                id="diagnoses-year"
                                {...register("autism-question-Ja", {
                                    required: {
                                        value: true,
                                        message: "Jaartal is verplicht",
                                    },
                                    min: {
                                        value: 1900,
                                        message: "Jaartal moet na 1900 zijn"
                                    },
                                    max: {
                                        value: 2006,
                                        message: "Jaartal moet voor 2006 zijn"
                                    }
                                })}
                            /></label>}


                    <InputField
                        inputId="email-field"
                        inputLabel="Email:"
                        inputType="text"
                        inputName="email"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Email is verplicht",
                            },
                            validate: (value) => value.includes('@') || "Email moet een @ bevatten",
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        inputId="password-field"
                        inputLabel="Wachtwoord:"
                        inputType="password"
                        inputName="password"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Wachtwoord is verplicht",
                            },
                            minLength: {
                                value: 8,
                                message: "Wachtwoord is tenminste 8 karakters lang",
                            }
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        inputId="username-field"
                        inputLabel="Gebruikersnaam:"
                        inputType="text"
                        inputName="username"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Gebruikersnaam is verplicht",
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        inputId="photo-field"
                        inputLabel="Profielfoto:"
                        inputType="file"
                        inputName="photo"
                        register={register}
                        errors={errors}
                    />

                    <Button type="submit">Registreren</Button>
                    <p>Heb je al een account? <Link to="/login">Log</Link> dan in.</p>
                </form>


            </div>
        </section>
    </>);
}

export default AccountRegister;