import React from 'react'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PermissionWrapper from '../../components/permissions/PermissionWrapper';

function Workouts() {
    const { t } = useTranslation('workout')

    return (
        <PermissionWrapper>
            <div>{t('workout')}</div>
        </PermissionWrapper>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Workouts