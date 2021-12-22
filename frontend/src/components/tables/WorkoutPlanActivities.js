import React from 'react'
import { useTranslation } from 'next-i18next';
import workoutService from '../../services/workout.service';
import { formatDateString } from '../../utils/extraFunctions';
import TableButton from '../buttons/TableButton';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

function WorkoutPlanActivitiesTable({slug}) {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutPlan(slug)
    const { mutate } = useSWRConfig()

    const handleOnClick = async() => {
        await workoutService.addWorkoutActivity({workoutPlan: slug})
        mutate(`/workout-plans/${slug}`)
    }

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-5xl">{data && data.name}</h1>
                <div className="flex justify-end"><TableButton text={t('addWorkoutActivity')} onClick={handleOnClick}/></div>
            </div>
            <div className="overflow-x-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <table className="min-w-full divide-y divide-gray-200 mt-5">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sets')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data && data.workouts.map(workout => {
                            return <Link key={workout.name} href={`/workouts/${workout.slug}`}><tr className="hover:scale-x-[1.01] bg-white hover:shadow-table cursor-pointer transition-transform ease-in-out overflow-y-scroll">
                                <td className="px-6 py-3">{formatDateString(workout.created)}</td>
                                <td className="px-6 py-3 mt-5">
                                    {workout.workoutexerciseSet.map(workoutExercise => {
                                        return <tr className="px-6 py-4 whitespace-nowrap" key={workoutExercise.id}>
                                            <td>
                                                {workoutExercise.exercise.name}
                                            </td>
                                        </tr>
                                    })}
                                </td>
                                <td className="px-6 py-3 mt-5">
                                    {workout.workoutexerciseSet.map(workoutExercise => {
                                        return <tr className="px-6 py-4" key={workoutExercise.id}>
                                            <td className="whitespace-nowrap">
                                                <div className="flex ml-2 space-x-1">
                                                {workoutExercise.sets.map(set => {
                                                    return <span key={set.id} className="px-3 my-2 py-1 inline-flex text-sm font-normal leading-5 rounded-full bg-secondary text-third">{set.reps}/{set.weight}kg</span>       
                                                })}
                                                </div>
                                            </td>
                                        </tr>
                                    })}
                                </td>
                            </tr></Link>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WorkoutPlanActivitiesTable
