import React from 'react';
import LoginForm from './LoginForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login = () => {
    return (
        <LoginForm />
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Login;