import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { login, selectAuth } from '../../../features/authSlice';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import authService from '../../../services/auth.service';


const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(selectAuth).error;
    const { t } = useTranslation('login')

    const handleLogin = (data, {setSubmitting}) => {
        dispatch(login({data, loginFunction: authService.login}))
        setSubmitting(false)
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12">
            <div className="md:max-w-lg w-full space-y-8">
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
                            <div className="text-sm">
                                <a href="#" className="font-normal">
                                {t('forgot_password')}
                                </a>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-normal">
                                {t('dont_have_account')}
                                </a>
                            </div>
                        </div>

                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} text={t('sign_in')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default LoginForm