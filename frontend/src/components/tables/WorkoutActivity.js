import React from 'react'
import { useTranslation } from 'next-i18next';
import workoutService from '../../services/workout.service';
import { formatDate } from '../../utils/extraFunctions';
import { useSWRConfig } from 'swr';

function WorkoutActivityTable({slug}) {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutActivity(slug)
    const { mutate } = useSWRConfig()

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200 mt-5">
                <thead className="bg-gray-50">
                    <tr>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('exercises')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sets')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.workoutexerciseSet.map(workout => {
                        return <tr key={workout.name}>
                            <td className="px-6 py-4 whitespace-nowrap">{workout.exercise.name}</td>
                            <td className="px-6 py-3 mt-5 space-x-1">
                                {workout.sets.map((set, index) => {
                                    return <span key={set.id}><div className="px-3 my-2 py-1 inline-flex text-sm font-normal leading-5 rounded-full bg-secondary text-third">
                                        <input onBlur={async() => {
                                            await workoutService.updateWorkoutExerciseSet(set.id, {reps:set.reps, weight:set.weight})
                                            mutate(`/workout-activities/${slug}`)
                                        }} className="outline-none bg-secondary w-4" type="text" size="2" maxLength={2} value={set.reps} name={`reps-${index}`} onChange={(e) => {set.reps=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                                        /<input onBlur={async() => {
                                            await workoutService.updateWorkoutExerciseSet(set.id, {reps:set.reps, weight:set.weight})
                                            mutate(`/workout-activities/${slug}`)
                                        }} size="3" maxLength={5} className="outline-none bg-secondary" type="text" value={set.weight} name={`weight-${index}`} onChange={(e) => {set.weight=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                                    </div></span>       
                                })}
                                <button onClick={async() => {
                                    workout.sets =[...workout.sets, {weight: 0, reps: 0}]
                                    mutate(`/workout-activities/${slug}`, {...data}, false)
                                    await workoutService.addWorkoutExerciseSet({workoutExercise: workout.id, reps:0, weight: 0})
                                    mutate(`/workout-activities/${slug}`)
                                }}>+</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default WorkoutActivityTable
