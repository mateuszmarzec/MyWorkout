import React from 'react'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PermissionWrapper from '../../components/permissions/PermissionWrapper';
import BaseSection from '../../components/sections/BaseSection';
import WorkoutActivitiesTable from '../../components/tables/WorkoutActivities';

function Workouts() {
    const { t } = useTranslation('workout')

    return (
        <PermissionWrapper>
            <BaseSection>
                <WorkoutActivitiesTable/>
            </BaseSection>
        </PermissionWrapper>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default Workouts
