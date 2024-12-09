import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useState} from "react";
import styles from './ReviewEdit.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function ReviewEdit({user, review, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            review: review.review,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    async function editReview(data) {
        try {
            await axiosHeader.put(`/reviews/users/${user.username}`, data);
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            console.error('Error updating review:', e);
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-review']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(editReview)} className={styles['edit-review']}>
                    <label htmlFor="review-field"> Update jouw review:
                        <textarea
                            name="review"
                            id="review-field"
                            cols="60"
                            rows="10"
                            {...register('review')}
                        ></textarea>
                    </label>
                    <Button type="submit" variant="secondary">Update jouw review</Button>
                    {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw"/>}
                </form>
            )}
        </div>
    );
}

export default ReviewEdit;