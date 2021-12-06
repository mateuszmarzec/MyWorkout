import React from 'react'
import PasswordResetForm from '../../components/forms/PasswordReset/PasswordResetForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BaseSection from '../../components/sections/BaseSection';

function PasswordReset() {
    return (
        <div className="h-[75vh]">
            <div className="my-auto">
                <BaseSection>
                    <PasswordResetForm />
                </BaseSection>
            </div>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default PasswordReset
