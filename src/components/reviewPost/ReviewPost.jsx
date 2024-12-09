import {useState} from "react";
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

    // eslint-disable-next-line no-unused-vars
    const [bioPost, setBioPost] = useState(review || "");

    async function postReview(data) {
        try {
            const response = await axiosHeader.post(`/reviews/users/${user.username}`, {
                review: data.review,
            });
            setBioPost(response.data);
            onUpdate();
        } catch (e) {
            console.error(e);
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
                        {...register('review', { required: true })}
                    ></textarea>
                </label>
                <Button type="submit" variant="secondary">Update Review</Button>
                {errors.bio && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."} />}
            </form>
        </div>
    );
}

export default ReviewPost;