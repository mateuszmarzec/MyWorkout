import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoginForm from '../../components/forms/Login/LoginForm';

function Index() {
  return (
    <>
      <LoginForm/>
    </>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...await serverSideTranslations(locale) } }
}

export default Index
