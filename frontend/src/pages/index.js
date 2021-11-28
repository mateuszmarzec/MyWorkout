import React from 'react'
import Header from './index/Header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
