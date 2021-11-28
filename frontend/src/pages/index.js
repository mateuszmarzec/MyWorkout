import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../components/header/Header';

function Index() {
  return (
    <>
      <Header/>
    </>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...await serverSideTranslations(locale) } }
}

export default Index
