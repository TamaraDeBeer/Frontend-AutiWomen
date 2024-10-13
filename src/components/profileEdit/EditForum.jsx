import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ProfileEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import InputField from "../inputField/InputField.jsx";
import {useForm} from "react-hook-form";

function EditForum({ forumId, forumData, onUpdate }) {
    const { handleSubmit, formState: { errors }, register } = useForm({
        defaultValues: {
            title: forumData.title,
            text: forumData.text,
            topic: forumData.topic,
        }
    });

    // const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [text, setText] = useState(forumData.text);
    const [topic, setTopic] = useState(forumData.topic);

    async function editForum(e) {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:1991/forums/${forumId}`, e, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
            setIsSubmitted(true);
            // navigate(`/forums/${forumId}`);
        } catch (e) {
            console.error(e);
            toggleError('Update niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
        {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (

            <form onSubmit={handleSubmit(editForum)} className={styles['edit-form']}>
                <InputField
                    inputId="name-field"
                    inputLabel="Naam:"
                    inputType="text"
                    inputName="name"
                    register={register}
                    errors={errors}
                />

                <InputField
                    inputId="title-field"
                    inputLabel="Titel:"
                    inputType="text"
                    inputName="title"
                    register={register}
                    errors={errors}
                />

                <label htmlFor="text-field" className={styles['forum-form__textarea']}> Tekst:
                    <textarea
                        name="forum-text"
                        id="forum-text"
                        cols="60"
                        rows="10"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>

                </label>

                <label htmlFor="topic" className={styles['forum-form__topic']}> Selecteer het bijpassende
                    onderwerp:
                    <select className={styles['forum-form__topic-select']}
                            id="topic"
                            name="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}>
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
                </label>

                <Button type="submit" variant="secondary">Update Gegevens</Button>
                {error && <ErrorMessage message={error} />}
            </form>
        )}
        </div>
    );
}

export default EditForum;