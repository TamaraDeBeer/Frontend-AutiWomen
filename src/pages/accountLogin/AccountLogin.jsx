import styles from "./AccountLogin.module.css";
import { useForm } from 'react-hook-form';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import axiosPublic from "../../helpers/axiosPublic.jsx";

function AccountLogin() {
    const { handleSubmit, formState: { errors }, register } = useForm({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);


    async function handleFormSubmit(data) {
        toggleError(false);
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const result = await axiosPublic.post('/login', {
                username: data.username,
                password: data.password
            }, { signal });
            login(result.data.jwt);
            navigate('/profile');
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
                toggleError(true);
            }
        } finally {
            toggleLoading(false);
        }
    }


    return (
        <section className="outer-container">
            <div className="inner-container">
                <form onSubmit={handleSubmit(handleFormSubmit)} className={`main-form ${styles['login-form']}`}>
                    <InputField
                        inputId="username-field"
                        inputLabel="Username:"
                        inputType="text"
                        inputName="username"
                        validationRules={{
                            required: {
                                value: true,
                                message: "Username is verplicht",
                            },
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
                    {loading && <p>Laden...</p>}
                    {error && <p>Er is iets fout gegaan, controleer je username en wachtwoord</p>}
                    <Button type="submit" disabled={loading}>Log in</Button>
                    <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
                </form>
            </div>
        </section>
    );
}

export default AccountLogin;
