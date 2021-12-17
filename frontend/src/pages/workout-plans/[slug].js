import React, { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import workoutService from '../../services/workout.service';
import { useRouter } from 'next/router';
import PermissionWrapper from '../../components/permissions/PermissionWrapper';
import BaseSection from '../../components/sections/BaseSection';
import WorkoutPlanActivitiesTable from '../../components/tables/WorkoutPlanActivities';

function WorkoutPlan() {
    const router = useRouter()
    const { slug } = router.query

    const { data, isValidating } = workoutService.useWorkoutPlan(slug)
    useEffect(() => {
        if (!(data || isValidating)) {
            router.push(`/404`);
        }
    }, [data, isValidating])

    return (
        <PermissionWrapper>
            <BaseSection>
                <WorkoutPlanActivitiesTable slug={slug}/>
            </BaseSection>
        </PermissionWrapper>
    )
}

export async function getServerSideProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default WorkoutPlan
