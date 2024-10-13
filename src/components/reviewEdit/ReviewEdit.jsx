import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import styles from './ReviewEdit.module.css';

function ReviewEdit({user, review, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            review: review.review,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);

    async function editReview(data) {
        try {
            await axios.put(`http://localhost:1991/reviews/${user.username}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            console.error('Error updating review:', e);
            toggleError('Update niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-review']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(editReview)} className={styles['edit-Review']}>
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