import React, { useState } from 'react'
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import authService from '../../../services/auth.service';
import Success from '../../alerts/Success';


const PasswordResetConfirmForm = ({userId, token}) => {
    const [passwordResetConfirmError, setPasswordResetConfirmError] = useState(false)
    const [passwordResetConfirmSuccess, setPasswordResetConfirmSuccess] = useState(false)
    const { t } = useTranslation(['passwordResetConfirm', 'common'])

    const handleReset = async (data, {setSubmitting}) => {
        try {
            await authService.passwordResetConfirm({uid:userId, token: token, ...data})
            setPasswordResetConfirmSuccess(true)
        }
        catch (err) {
            setPasswordResetConfirmError(err.response.data)
        }
        setSubmitting(false)
        
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="md:max-w-lg w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('passwordResetConfirm')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={handleReset} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {passwordResetConfirmError && (typeof passwordResetConfirmError === 'string' || passwordResetConfirmError.token || passwordResetConfirmError.userId) && <Error>{t('common:error')}</Error>}
                        {passwordResetConfirmSuccess && <Success>{t('success')}</Success>}
                        <div className="rounded-md space-y-4 mb-6">
                        <StyledTextInput 
                            id="new_password1"
                            name="new_password1"
                            type="password"
                            autoComplete="password"
                            required
                            placeholder={t('password')}
                            errors={passwordResetConfirmError.new_password1}
                        />
                        <StyledTextInput 
                            id="new_password2"
                            name="new_password2"
                            type="password"
                            autoComplete="password"
                            required
                            placeholder={t('passwordConfirm')}
                            errors={passwordResetConfirmError.new_password2}
                        />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting} text={t('passwordResetConfirm')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default PasswordResetConfirmForm