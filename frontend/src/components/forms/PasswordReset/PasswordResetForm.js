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
import Success from '../../alerts/Success';


const PasswordResetForm = () => {
    const [passwordResetError, setPasswordResetError] = useState(false)
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)
    const { t } = useTranslation('passwordReset')

    const handleReset = async (data, {setSubmitting}) => {
        try {
            await authService.passwordReset(data)
            setPasswordResetSuccess(true)
        }
        catch (err) {
            setPasswordResetError(err.response.data)
        }
        setSubmitting(false)
        
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="md:max-w-lg w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('passwordReset')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={handleReset} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {passwordResetError && <Error>{passwordResetError}</Error>}
                        {passwordResetSuccess && <Success>{t('success')}</Success>}
                        <div className="rounded-md space-y-4 mb-6">
                            <StyledTextInput 
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={t('email')}
                            />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} text={t('passwordReset')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default PasswordResetForm