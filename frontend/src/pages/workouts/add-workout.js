import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import WorkoutForm from '../../components/forms/Workout/WorkoutForm';
import BaseSection from '../../components/sections/BaseSection';

function AddWorkout() {
    return (
        <BaseSection>
            <WorkoutForm />
        </BaseSection>
    )
}

export async function getStaticProps({ locale }) {
    return { props: { ...await serverSideTranslations(locale) } }
}

export default AddWorkout
