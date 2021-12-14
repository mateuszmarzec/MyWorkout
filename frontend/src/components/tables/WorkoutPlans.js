import React from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import TableButton from '../buttons/TableButton';

function WorkoutPlansTable({workoutPlans}) {
    const { t } = useTranslation('workout');

    return (
        <div>
            <div className="flex justify-end"><Link href="/workouts/add-workout/"><TableButton text={t('addWorkout')}/></Link></div>
            <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('workoutPlans')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {workoutPlans && workoutPlans.map(workout => {
                        return <Link key={workout.name} href="#"><tr>
                            <td className="px-6 py-4 whitespace-nowrap">{workout.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {workout.exercises.map(exercise => { return <span className="px-3 py-1 inline-flex text-sm font-normal leading-5 rounded-full bg-secondary text-third" key={exercise.name}>{exercise.name}</span>})}
                            </td>
                        </tr></Link>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WorkoutPlansTable
