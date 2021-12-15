import React from 'react'
import { useTranslation } from 'next-i18next';
import workoutService from '../../services/workout.service';
import { formatDate } from '../../utils/extraFunctions';

function WorkoutActivitiesTable({slug}) {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutPlan(slug)

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.workouts.map(workout => {
                        return <tr key={workout.name}>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(workout.created)}</td>
                            <td className="px-6 py-4 whitespace-nowrap divide-y divide-gray-200 mt-5">
                                {workout.workoutexercise_set.map(workoutExercise => {
                                    return <tr className="px-6 py-4 whitespace-nowrap" key={workoutExercise.id}>
                                        <td>
                                            {workoutExercise.exercise.name}
                                        </td>
                                        <td>
                                            {workoutExercise.sets.map(set => {
                                                return <tr key={set.id}>
                                                    <td className="whitespace-nowrap space-x-1">
                                                        <span className="px-3 py-1 inline-flex text-sm font-normal leading-5 rounded-full bg-secondary text-third">{t('reps')}: {set.reps}</span>
                                                        <span className="px-3 py-1 inline-flex text-sm font-normal leading-5 rounded-full bg-secondary text-third">{t('weight')}: {set.weight}</span>
                                                    </td>
                                                </tr>
                                            })}
                                        </td>
                                    </tr>
                                })}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WorkoutActivitiesTable
