import Button from "../button/Button.jsx";
import styles from './ForumEdit.module.css';
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import InputField from "../inputField/InputField.jsx";
import { useForm } from "react-hook-form";
import {useState} from "react";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function EditForum({ forumId, forumData, onUpdate }) {
    const { handleSubmit, formState: { errors }, register} = useForm({
        defaultValues: {
            title: forumData.title,
            text: forumData.text,
            topic: forumData.topic,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);
    const [topic, setTopic] = useState(forumData.topic);

    async function editForum(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.put(`/forums/${forumId}`, data);
            onUpdate(response.data);
            setIsSubmitted(true);
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-forum']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <div className={styles['edit-forum']}>
                    <h3>Update:</h3>
                    <form onSubmit={handleSubmit(editForum)}>
                        <InputField
                            inputId="title-field"
                            inputLabel="Titel:"
                            inputType="text"
                            inputName="title"
                            register={register}
                            errors={errors}
                        />

                        <label htmlFor="text-field"> Tekst:
                            <textarea
                                name="text"
                                id="text-field"
                                cols="60"
                                rows="10"
                                {...register('text')}
                            ></textarea>
                        </label>

                        <label htmlFor="topic"> Selecteer het bijpassende
                            onderwerp:
                            <select
                                className={styles['topic-select']}
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

                        <Button type="submit" variant="secondary">Update Forum</Button>
                        {error && <ErrorMessage message={error}/>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditForum;