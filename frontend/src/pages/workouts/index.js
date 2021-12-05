import React from 'react'
import PermissionWrapper from '../../components/permissions/PermissionWrapper';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import authService from '../../services/auth.service';

function Workouts() {
    const { t } = useTranslation('workout')

    return (
        <PermissionWrapper>
            <div>{t('workout')}</div>
        </PermissionWrapper>
    )
}

export async function getServerSideProps({ locale, req }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Workouts
