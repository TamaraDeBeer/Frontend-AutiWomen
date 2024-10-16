import { useForm } from 'react-hook-form';
import styles from './ProfileEdit.module.css';
import InputField from '../inputField/InputField.jsx';
import Button from "../button/Button.jsx";
import {useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import axiosHeader from "../../helpers/axiosHeader.jsx";

function EditProfileData({ user, profile, onUpdate }) {
    const { handleSubmit, formState: { errors }, register, watch } = useForm({
        defaultValues: {
            name: profile.name,
            email: profile.email,
            dob: profile.dob,
            autismDiagnoses: profile.autismDiagnoses,
            autismDiagnosesYear: profile.autismDiagnosesYear,
        }
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, toggleError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [loading, toggleLoading] = useState(false);
    const watchAutismDiagnoses = watch('autismDiagnoses');

    const handleProfileDataSubmit = async (data) => {
        toggleError(false);
        toggleLoading(true);
        try {
            await axiosHeader.put(`/users/${user.username}/profile-data`, data);
            onUpdate();
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error updating profile data:', error);
            toggleError(true);
        }
        toggleLoading(false);
    };

    return (
        <div>
        {isSubmitted ? (
                <div className={styles['edit-form']}>
                    <p>Update succesvol!</p>
                </div>
            ) : (
        <form onSubmit={handleSubmit(handleProfileDataSubmit)} className={styles['edit-form']}>
            <InputField
                inputId="name-field"
                inputLabel="Naam:"
                inputType="text"
                inputName="name"
                register={register}
                errors={errors}
            />
            <InputField
                inputId="email-field"
                inputLabel="Email:"
                inputType="email"
                inputName="email"
                register={register}
                errors={errors}
            />
            <InputField
                inputId="dob-field"
                inputLabel="Geboortedatum:"
                inputType="date"
                inputName="dob"
                register={register}
                errors={errors}
            />
            <label>
                Autisme:
                <select name="autismDiagnoses" {...register('autismDiagnoses')}>
                    <option value="Ja">Ja</option>
                    <option value="Vermoeden">Vermoeden</option>
                </select>
            </label>
            {watchAutismDiagnoses === 'Ja' && (
                <InputField
                    inputId="autism-diagnoses-year-field"
                    inputLabel="Autisme diagnose sinds:"
                    inputType="number"
                    inputName="autismDiagnosesYear"
                    register={register}
                    errors={errors}
                />
            )}
            <Button type="submit" variant="secondary">Update Gegevens</Button>
            {error && <ErrorMessage message={error} />}
        </form>
        )}
        </div>
    );
}

export default EditProfileData;