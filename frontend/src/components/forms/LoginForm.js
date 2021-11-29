import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { login, selectAuth } from '../../features/authSlice';
import { Grid, Container, Button, Typography, Alert } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link'
import StyledTextInput from '../inputs/StyledTextInput';


const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector(selectAuth).error;
    const { t } = useTranslation('login')

    const handleLogin = (data, {setSubmitting}) => {
        dispatch(login(data))
        setSubmitting(false)
    }

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const initialValues = {
        email: '',
        password: '',
    }


    return (
        <div>
            <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h4">
                {t('sign_in')}
            </Typography>
            <Formik validationSchema={schema} validateOnChange={false} validateOnBlur={false} onSubmit={handleLogin} initialValues={initialValues}>
            {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                <form className="loginForm__form" onSubmit={handleSubmit} noValidate>
                    {loginError && <Alert severity="error">{loginError}</Alert>}
                    <StyledTextInput
                        margin="normal"
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label={t('email')}
                        name="email"
                        autoComplete="email"
                    />
                    <StyledTextInput
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                <Button type="submit" disabled={isSubmitting} fullWidth variant="contained">{t('sign_in')}</Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" size="0.7em">
                        <a>
                        {t('forgot_password')}?
                        </a>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" size="0.7em">
                        <a>
                      {t('dont_have_account')}
                      </a>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
            </Formik>
        </Container>
        </div>
    );
}

export default LoginForm