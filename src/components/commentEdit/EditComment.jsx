import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../forumEdit/ForumEdit.module.css";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";

function EditComment ({forumId, commentId, commentData, onUpdate}) {
    const { handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            text: commentData.text,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);

    useEffect(() => {
        console.log('isSubmitted state changed:', isSubmitted);
    }, [isSubmitted]);

    async function editComment(data) {
        console.log('editComment function called');
        try {
            const response = await axios.put(`http://localhost:1991/forums/${forumId}/comments/${commentId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            console.log('Response received:', response.data);
            onUpdate(response.data);
            setIsSubmitted(true);
            console.log('isSubmitted set to true');
        } catch (e) {
            console.error(e);
            toggleError('Update niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-comment']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <div className={styles['edit-comment']}>
                    <h3>Update:</h3>
                    <form onSubmit={handleSubmit(editComment)}>
                        <label htmlFor="text-field"> Tekst:
                            <textarea
                                name="text"
                                id="text-field"
                                cols="60"
                                rows="10"
                                {...register('text')}
                            ></textarea>
                        </label>


                        <Button type="submit" variant="secondary">Update Comment</Button>
                        {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw" />}
                    </form>
                </div>
            )}


        </div>


    )


}

export default EditComment;