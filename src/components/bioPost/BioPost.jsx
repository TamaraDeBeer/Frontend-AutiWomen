import {useForm} from "react-hook-form";
import Button from "../button/Button.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import styles from './BioPost.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";
import {useEffect, useState} from "react";

function BioPost({bio, user, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            bio: bio || "",
        }
    });

    const [loading, toggleLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        };
    }, []);

    async function postBio(data) {
        toggleLoading(true);
        try {
            await axiosHeader.post(`/profiles/users/${user.username}`, {
                bio: data.bio,
            });
            onUpdate();
        } catch (e) {
            console.error(e);
        }
        toggleLoading(false);
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
                        {...register('bio', {required: true})}
                    ></textarea>
                </label>
                <Button type="submit" variant="secondary">Verzenden</Button>
                {loading && <p>Laden...</p>}
                {errors.bio && <ErrorMessage message={"Er ging iets mis, probeer het later opnieuw."}/>}
            </form>
        </div>
    );
}

export default BioPost;