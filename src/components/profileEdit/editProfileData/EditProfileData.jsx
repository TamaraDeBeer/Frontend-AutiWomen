import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../ProfileEdit.module.css';
import InputField from '../../inputField/InputField.jsx';
import Button from "../../button/Button.jsx";

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

    const watchAutismDiagnoses = watch('autismDiagnoses');

    const handleProfileDataSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:1991/users/${user.username}/profile-data`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            onUpdate();
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleProfileDataSubmit)} className={styles['user-info-form']}>
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
                    <option value="Nee">Nee</option>
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
        </form>
    );
}

export default EditProfileData;