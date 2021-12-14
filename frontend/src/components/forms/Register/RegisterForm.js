import React, { useState } from 'react'
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import authService from '../../../services/auth.service';
import Success from '../../alerts/Success';
import FacebookButton from '../../buttons/social/FacebookButton';
import GoogleButton from '../../buttons/social/GoogleButton';


const RegisterForm = () => {
    const [registerErrors, setRegisterErrors] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const { t } = useTranslation(['register', 'common'])

    const handleRegister = async (data, {setSubmitting}) => {
        setRegisterErrors(false)
        setRegisterSuccess(false)
        try {
            await authService.register(data)
            setRegisterSuccess(true)
        }
        catch (error) {
            setRegisterErrors(error.response.data)
        }
        setSubmitting(false)
    }

    return (
        <div className="min-h-full flex items-center justify-end">
            <div className="md:max-w-xl w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('sign_up')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={handleRegister} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {registerErrors && typeof registerErrors === 'string' && <Error>{t('common:error')}</Error>}
                        {registerSuccess && <Success>{t('success')}</Success>}
                        <div className="rounded-md mb-6">
                            <StyledTextInput 
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={t('email')}
                                errors={registerErrors.email}
                            />
                            <StyledTextInput 
                                id="password1"
                                name="password1"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder={t('password')}
                                errors={registerErrors.password1}
                            />
                            <StyledTextInput 
                                id="password2"
                                name="password2"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder={t('passwordConfirm')}
                                errors={registerErrors.password2}
                            />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting} text={t('sign_up')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    <span className="flex flex-row my-6 before:flex-1 before:border-b before:m-auto before:mr-[10px] before:ml-20 after:flex-1 after:border-b after:m-auto after:ml-[10px] after:mr-20">{t('or')}</span>
                    <div className="flex justify-between">
                        <GoogleButton setErrors={setRegisterErrors} />
                        <FacebookButton  setErrors={setRegisterErrors} />
                    </div>
                </div>
            </div>
    );
}

export default RegisterForm