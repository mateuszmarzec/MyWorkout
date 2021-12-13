import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BaseSection from '../components/sections/BaseSection';

function Custom500() {
    return <div className="flex min-h-[75vh]">
        <div className="m-auto">
            <BaseSection>
            <span className="text-6xl text-center">500</span>
            </BaseSection>
        </div>
    </div>
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Custom500
