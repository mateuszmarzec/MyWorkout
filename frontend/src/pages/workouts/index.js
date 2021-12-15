import React from 'react'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PermissionWrapper from '../../components/permissions/PermissionWrapper';
import BaseSection from '../../components/sections/BaseSection';
import WorkoutPlansTable from '../../components/tables/WorkoutPlans';

function Workouts() {
    const { t } = useTranslation('workout')

    return (
        <PermissionWrapper>
            <BaseSection>
                <WorkoutPlansTable/>
            </BaseSection>
        </PermissionWrapper>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Workouts
