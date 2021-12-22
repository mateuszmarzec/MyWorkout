import React from 'react'
import { useTranslation } from 'next-i18next';
import workoutService from '../../services/workout.service';
import { formatDate } from '../../utils/extraFunctions';
import Link from 'next/link';

function WorkoutActivitiesTable() {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutActivities()

    return (
        <div className="overflow-x-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sets')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('workoutPlan')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.map(workout => {
                        return <Link key={workout.name} href={`workouts/${workout.slug}`}><tr className="hover:scale-x-[1.01] bg-white hover:shadow-table cursor-pointer transition-transform ease-in-out overflow-y-scroll">
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(workout.created)}</td>
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
                            <td className="px-6 py-4 whitespace-nowrap">{workout.workoutPlan}</td>
                        </tr></Link>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WorkoutActivitiesTable
