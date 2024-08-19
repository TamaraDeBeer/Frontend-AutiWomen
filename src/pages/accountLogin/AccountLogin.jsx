import styles from "./AccountLogin.module.css";
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";

function AccountLogin() {
    const {handleSubmit, formState: {errors}, register, } = useForm( {
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
                <div className={`${styles['inner-container']} ${styles['section-login__inner-container']}`}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <label htmlFor="email-field">
                            Email:
                            <input
                                type="text"
                                id="email-field"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is verplicht",
                                    },
                                    validate: (value) => value.includes('@') || "Email moet een @ bevatten",
                                })}
                            />
                            {errors.email && <p>{errors.email.message}</p>}
                        </label>

                        <label htmlFor="password">
                            Wachtwoord:
                            <input
                                type="text"
                                id="password-field"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is verplicht",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Wachtwoord is tenminste 8 karakters lang",
                                    }
                                })}
                            />
                            {errors.password && <p>{errors.password.message}</p>}
                        </label>

                        <Button type="submit">Login</Button>
                    </form>

                </div>
            </section>
        </>);
}

export default AccountLogin;