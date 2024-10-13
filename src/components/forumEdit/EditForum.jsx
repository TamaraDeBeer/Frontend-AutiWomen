import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import styles from './ForumEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import InputField from "../inputField/InputField.jsx";
import { useForm } from "react-hook-form";

function EditForum({ forumId, forumData, onUpdate }) {
    const { handleSubmit, formState: { errors }, register} = useForm({
        defaultValues: {
            title: forumData.title,
            text: forumData.text,
            topic: forumData.topic,
        }
    });

    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    const [topic, setTopic] = useState(forumData.topic);

    useEffect(() => {
        console.log('isSubmitted state changed:', isSubmitted);
    }, [isSubmitted]);

    async function editForum(data) {
        console.log('editForum function called');
        try {
            const response = await axios.put(`http://localhost:1991/forums/${forumId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            console.log('Response received:', response.data);
            onUpdate(response.data);
            setIsSubmitted(true);
            console.log('isSubmitted set to true');
            // setTimeout(() => {
            //     navigate(`/forums/${forumId}`);
            // }, 1000);
        } catch (e) {
            console.error(e);
            toggleError('Update niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-forum']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <div className={styles['edit-forum']}>
                    <h3 className={styles['section-forum__comment-reactie']}>Update:</h3>
                    <form onSubmit={handleSubmit(editForum)}>
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
                                name="text"
                                id="text-field"
                                cols="60"
                                rows="10"
                                {...register('text')}
                            ></textarea>
                        </label>

                        <label htmlFor="topic" className={styles['forum-form__topic']}> Selecteer het bijpassende
                            onderwerp:
                            <select
                                className={styles['forum-form__topic-select']}
                                id="topic"
                                name="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                {...register('topic')}
                            >
                                <option value="" disabled>-- Selecteer een onderwerp --</option>
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
                        {error && <ErrorMessage message={error}/>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditForum;