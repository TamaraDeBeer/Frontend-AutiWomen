import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import styles from './ReviewEdit.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function ReviewEdit({user, review, reviewId, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            review: review.review,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function editReview(data) {
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            await axiosHeader.put(`/reviews/${reviewId}/users/${user.username}`, data, {signal});
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            if (e.name !== 'CanceledError') {
                console.error(e);
            }
        } finally {
            toggleLoading(false);
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
                    {loading && <p>Laden...</p>}
                    {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw"/>}
                </form>
            )}
        </div>
    );
}

export default ReviewEdit;