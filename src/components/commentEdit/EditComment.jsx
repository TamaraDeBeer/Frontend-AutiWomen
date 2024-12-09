import {useForm} from "react-hook-form";
import {useState} from "react";
import styles from "../forumEdit/ForumEdit.module.css";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function EditComment ({forumId, commentId, user, commentData, onUpdate}) {
    console.log('forumId:', forumId);

    const { handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            text: commentData.text,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);

    async function editComment(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axiosHeader.put(`/comments/${commentId}/forums/${forumId}/users/${user.username}`, data);
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
                <div className={styles['edit-bio']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <div className={styles['edit-bio']}>
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