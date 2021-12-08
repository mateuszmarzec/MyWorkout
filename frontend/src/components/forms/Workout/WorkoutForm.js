import React, { useState } from 'react'
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import authService from '../../../services/auth.service';
import { useRouter } from 'next/router';
import StyledTextArea from '../../inputs/StyledTextArea';

const WorkoutForm = () => {
    const [loginError, setLoginError] = useState(false)
    const { t } = useTranslation('workout')
    const router = useRouter()

    const handleLogin = async (data, {setSubmitting}) => {
        try {
            await authService.login(data)
        }
        catch (err) {
            setLoginError(err.message)
            return
        }
        setSubmitting(false)
        router.push(`/${router.query.next || "workouts"}`)
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="md:max-w-lg w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('sign_in')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={handleLogin} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {loginError && <Error>{t('loginError')} {loginError}</Error>}
                        <div className="rounded-md space-y-4 mb-6">
                            <StyledTextInput 
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder={t('name')}
                            />
                            <StyledTextArea
                                id="note"
                                name="note"
                                type="text"
                                placeholder={t('note')}
                            />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} text={t('add_workout')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default WorkoutForm