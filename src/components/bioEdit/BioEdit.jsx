import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import styles from './BioEdit.module.css';
import axiosHeader from "../../helpers/axiosHeader.jsx";

function BioEdit({user, profileId, bio, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            bio: bio.bio,
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

    async function editBio(data) {
        toggleLoading(true);
        try {
            await axiosHeader.put(`/profiles/${profileId}/users/${user.username}`, data);
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            console.error('Error updating bio:', e);
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
                <form onSubmit={handleSubmit(editBio)} className={styles['edit-bio']}>
                    <label htmlFor="bio-field"> Update jouw verhaal:
                        <textarea
                            name="bio"
                            id="bio-field"
                            cols="60"
                            rows="10"
                            {...register('bio')}
                        ></textarea>
                    </label>
                    <Button type="submit" variant="secondary">Update jouw verhaal</Button>
                    {loading && <p>Laden...</p>}
                    {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw"/>}
                </form>
            )}
        </div>
    );
}

export default BioEdit;