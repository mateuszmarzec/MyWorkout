import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import authService from '../../services/auth.service';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


function Activate() {
    const router = useRouter()
    const { key } = router.query
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const { t } = useTranslation('activate')

    useEffect(() => {
        if (key) {
            authService.confirmEmail(key)
            .then(() => {
                setSuccess(true)
            })
            .catch (error => {
                setError(t("invalidKey"))
            })
        }
        else{
            router.push("/")
        }
    }, [])

    return (
        <div className="flex h-[75vh]">
            <h1 className="text-6xl text-center m-auto">{error && error || t('success')}</h1>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Activate