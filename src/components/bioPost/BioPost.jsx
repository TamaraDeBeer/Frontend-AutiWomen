import {useState} from "react";
import {useForm} from "react-hook-form";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import styles from './BioPost.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function BioPost({bio, user, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            bio: bio || "",
        }
    });

    // eslint-disable-next-line no-unused-vars
    const [bioPost, setBioPost] = useState(bio || "");

    async function postBio(data) {
        try {
            const response = await axiosHeader.post(`/profiles/users/${user.username}`, {
                bio: data.bio,
            });
            setBioPost(response.data.bio);
            onUpdate();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(postBio)} className={styles['post-bio']}>
                <label htmlFor="bio-field"> Schrijf iets over jezelf:
                    <textarea
                        name="bio"
                        id="bio-field"
                        cols="60"
                        rows="10"
                        {...register('bio', { required: true })}
                    ></textarea>
                </label>
                <Button type="submit" variant="secondary">Update Gegevens</Button>
                {errors.bio && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."} />}
            </form>
        </div>
    );
}

export default BioPost;