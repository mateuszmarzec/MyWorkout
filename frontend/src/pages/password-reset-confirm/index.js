import React, { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BaseSection from '../../components/sections/BaseSection';
import { useRouter } from 'next/router';
import PasswordResetConfirmForm from '../../components/forms/PasswordResetConfirm/PasswordResetConfirmForm';

function PasswordResetConfirm() {
    const router = useRouter()
    const { userId, token } = router.query

    useEffect(() => {
        if (userId && token) {

        }
        if (userId === "" || token === "") {
            router.push("/")
        }
    }, [])

    return (
        <div className="h-[75vh]">
            <div className="my-auto">
                <BaseSection>
                    <PasswordResetConfirmForm userId={userId} token={token} />
                </BaseSection>
            </div>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default PasswordResetConfirm
