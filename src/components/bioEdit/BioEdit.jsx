import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import styles from './BioEdit.module.css';

function BioEdit({user, bio, onUpdate}) {
    const {handleSubmit, formstate: {errors}, register} = useForm({
        defaultValues: {
            bio: bio.bio,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [error, toggleError] = useState(false);

    async function editBio(data) {
        try {
            await axios.put(`http://localhost:1991/users/profiles/${user.username}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
            setIsSubmitted(true);
        } catch (e) {
            console.error('Error updating bio:', e);
            toggleError('Update niet gelukt, probeer het later opnieuw');
        }
    }

    return (
        <div>
            {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(editBio)} className={styles['edit-form']}>
                    <label htmlFor="bio-field"> Schrijf iets over jezelf:
                        <textarea
                            name="bio"
                            id="bio-field"
                            cols="60"
                            rows="10"
                            {...register('bio')}
                        ></textarea>
                    </label>
            <Button type="submit" variant="secondary">Update Gegevens</Button>
                    {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw" />}
                </form>
                )}
        </div>
    );
}

export default BioEdit;