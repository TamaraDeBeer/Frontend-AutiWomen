import styles from "../forumCreate/ForumCreate.module.css";
import InputField from "../../components/inputField/InputField.jsx";
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";

function ForumCreate() {
    const {handleSubmit, formState: {errors}, register,} = useForm({
        defaultValues: {
            name: '',
            title: '',
        }
    });

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (<>

            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-hero__inner-container']}`}>
                    <h1>Auti-Women Forum</h1>
                    <h2>Deel je problemen, geef advies en wees respectvol</h2>
                </div>
            </section>

            <section className={styles['outer-container']}>
                <div className={`${styles['inner-container']} ${styles['section-post__inner-container']}`}>
                    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles['forum-form']}>
                        <InputField
                            inputId="name-field"
                            inputLabel="Naam:"
                            inputType="text"
                            inputName="name"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "naam is verplicht",
                                },
                            }}
                            register={register}
                            errors={errors}
                        />

                        <InputField
                            inputId="title-field"
                            inputLabel="Titel:"
                            inputType="textarea"
                            inputName="title"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: "Titel is verplicht",
                                },
                                maxLength: {
                                    value: 40,
                                    message: "De titel mag maximaal 40 karakters lang zijn",
                                }
                            }}
                            register={register}
                            errors={errors}
                        />

                        <label htmlFor="text-field" className={styles['forum-form__textarea']}>
                            Tekst:
                            <textarea
                                id="text-field"
                                rows="10"
                                cols="60"
                                {...register("text-content", {
                                    required: {
                                        value: true,
                                        message: "Tekst is verplicht",
                                    },
                                    maxLength: {
                                        value: 2000,
                                        message: "De tekst mag maximaal 2000 karakters lang zijn",
                                    }
                                })}>
                            </textarea>
                            {errors['text-content'] && <p>{errors['text-content'].message}</p>}
                        </label>

                        <p className={styles['forum-form__topic']}>Selecteer het bijpassende onderwerp:</p>
                        <select className={styles['forum-form__topic-select']} {...register("topic", {
                            required: {
                                value: true,
                                message: "Maak een keuze",
                            },
                        })}>
                            <option value="" disabled selected>-- Selecteer een onderwerp --</option>
                            <option value="fysiek">Fysieke Gezondheid</option>
                            <option value="mentaal">Mentale Gezondheid</option>
                            <option value="structuur">Structuur</option>
                            <option value="werk">Werk</option>
                            <option value="relaties">Relaties</option>
                            <option value="school">School</option>
                            <option value="huishouden">Huishouden</option>
                            <option value="vriendschappen">Vriendschappen</option>
                            <option value="rouw">Rouw</option>
                            <option value="overig">Overig</option>
                        </select>
                        {errors.topic && <p>{errors.topic.message}</p>}

                        <div className={styles['forum-form__buttons']}>
                            <Button type="reset">Annuleren</Button>
                            <Button type="submit">Verstuur</Button>
                        </div>

                    </form>


                </div>
            </section>


        </>

    );
}

export default ForumCreate;