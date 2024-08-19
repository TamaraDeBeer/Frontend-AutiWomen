import styles from './AccountRegister.module.css';
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {Link} from "react-router-dom";

function AccountRegister() {
    const {handleSubmit, formState: {errors}, register,} = useForm({
        defaultValues: {
            email: "......@....com",
            password: "********",
        }
    });

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (<>

        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-register__inner-container']}`}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles['login-form']}>

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

                    <Button type="submit">Login</Button>
                    <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                </form>


            </div>
        </section>
    </>);
}

export default AccountRegister;