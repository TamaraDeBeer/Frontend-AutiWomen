import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import styles from './ReviewPost.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function ReviewPost({review, user, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            review: review || "",
        }
    });

    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function postReview(data) {
        toggleLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            await axiosHeader.post(`/reviews/users/${user.username}`, {
                review: data.review
            }, { signal });
            onUpdate();
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
            <form onSubmit={handleSubmit(postReview)} className={styles['post-review']}>
                <label htmlFor="review-field"> Schrijf een review over deze website:
                    <textarea
                        name="review"
                        id="review-field"
                        cols="60"
                        rows="10"
                        {...register('review', {required: true})}
                    ></textarea>
                </label>
                <Button type="submit" variant="secondary">Verzenden</Button>
                {loading && <p>Laden...</p>}
                {errors.bio && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."}/>}
            </form>
        </div>
    );
}

export default ReviewPost;