import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoginForm from '../../components/forms/Login/LoginForm';
import BaseSection from '../../components/sections/BaseSection';

function Index() {
  return (
    <div className="h-[75vh]">
      <div className="my-auto">
        <BaseSection>
          <LoginForm/>
        </BaseSection>
      </div>
    </div>
  )
}
export async function getStaticProps({ locale }) {
  return { props: { ...await serverSideTranslations(locale) } }
}

export default Index
