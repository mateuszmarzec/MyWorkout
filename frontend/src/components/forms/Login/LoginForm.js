import React, { useState } from 'react'
import { Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import authService from '../../../services/auth.service';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GoogleButton from '../../buttons/social/GoogleButton';
import FacebookButton from '../../buttons/social/FacebookButton';


const LoginForm = () => {
    const [loginError, setLoginError] = useState(false)
    const { t } = useTranslation('login')
    const router = useRouter()

    const handleLogin = async (data, {setSubmitting}) => {
        try {
            await authService.login(data)
        }
        catch (err) {
            setLoginError(err.message)
            setSubmitting(false)
            return
        }
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
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={t('email')}
                            />
                            <StyledTextInput 
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder={t('password')}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-normal">
                                <Link href="/password-reset">
                                {t('forgot_password')}
                                </Link>
                            </div>
                            <div className="text-sm font-normal">
                                <Link href="/">
                                {t('dont_have_account')}
                                </Link>
                            </div>
                        </div>

                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting} text={t('sign_in')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    <span className="flex flex-row my-6 before:flex-1 before:border-b before:m-auto before:mr-[10px] before:ml-20 after:flex-1 after:border-b after:m-auto after:ml-[10px] after:mr-20">{t('or')}</span>
                    <div className="flex justify-between">
                        <GoogleButton setErrors={setLoginError}/>
                        <FacebookButton setErrors={setLoginError} />
                    </div>
                    </div>
                </div>
    );
}

export default LoginForm