import {useForm} from "react-hook-form";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Button from "../button/Button.jsx";
import {useState} from "react";
import axios from "axios";
import styles from './BioEdit.module.css';

function BioEdit({user, bio, onUpdate}) {
    const {handleSubmit, formState: {errors}, register} = useForm({
        defaultValues: {
            bio: bio.bio,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);


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
        }
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
                    {errors.text && <ErrorMessage message="Update niet gelukt, probeer het later opnieuw"/>}
                </form>
            )}
        </div>
    );
}

export default BioEdit;