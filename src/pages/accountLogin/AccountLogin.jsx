import styles from "./AccountLogin.module.css";
import {useForm} from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import axios from "axios";

function AccountLogin() {
    const {handleSubmit, formState: {errors}, register,} = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const source = axios.CancelToken.source();
    const {login} = useContext(AuthContext);

    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:1991/login', {
                email: data.email,
                password: data.password
            },{
                cancelToken: source.token,
            });
            console.log(result.data);
            login(result.data.accessToken);
            navigate('/profile');

        } catch(e) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (<>

        <section className={styles['outer-container']}>
            <div className={`${styles['inner-container']} ${styles['section-login__inner-container']}`}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className={styles['login-form']}>
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
                    {error && <p>Er bestaat geen account met dit emailadres en wachtwoord.</p>}
                    <Button type="submit" disabled={loading}>Log in</Button>
                    <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                </form>


            </div>
        </section>
    </>);
}

export default AccountLogin;