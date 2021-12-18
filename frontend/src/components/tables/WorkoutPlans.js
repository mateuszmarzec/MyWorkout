import React from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import TableButton from '../buttons/TableButton';
import workoutService from '../../services/workout.service';

function WorkoutPlansTable() {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutPlans()

    return (
        <div>
            <div className="flex justify-end"><Link href="/workout-plans/add-workout/"><TableButton text={t('addWorkoutPlan')}/></Link></div>
            <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('workoutPlans')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {data && data.map(workout => {
                        return <Link key={workout.name} href={`workout-plans/${workout.slug}`}><tr className="hover:scale-x-[1.01] bg-white hover:shadow-table cursor-pointer transition-transform ease-in-out">
                            <td className="px-6 py-4 whitespace-nowrap">{workout.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap space-x-1">
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
