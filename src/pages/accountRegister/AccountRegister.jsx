import styles from './AccountRegister.module.css';
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {Link} from "react-router-dom";

function AccountRegister() {
    const {handleSubmit, formState: {errors}, register,} = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            gender: 'Vrouw',
            dob: "",
        }
    });

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
                                contains: true,
                                message: "Dit veld is verplicht",
                            },
                            // contains: {
                            //     value: "vrouw",
                            //     message: "Deze website is alleen bedoeld voor vrouwen, sorry mannen",
                            // }
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

                    <p className={styles['section-register__autism']}>Autisme?</p>
                    <select {...register("autisme", { required: true })}>
                        <option value="Ja">Ja</option>
                        <option value="Nee">Nee</option>
                        <option value="Vermoeden">Vermoeden</option>
                        {errors['autisme'] && <p>{errors['autisme'].message}</p>}
                    </select>

                    {/*als je naar extra invoerveld jaartal diagnose react hoofdstuk 6.5*/}

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