import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../components/header/Header';
import HomeLayout from '../components/layouts/HomeLayout';

function Index() {
  return (
    <HomeLayout>
      <Header/>
    </HomeLayout>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...await serverSideTranslations(locale) } }
}

export default Index
