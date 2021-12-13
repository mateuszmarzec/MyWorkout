import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoginForm from '../../components/forms/Login/LoginForm';
import BaseSection from '../../components/sections/BaseSection';

function Index() {
  return (
    <div className="min-h-[75vh] flex">
      <div className="m-auto flex-1">
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
