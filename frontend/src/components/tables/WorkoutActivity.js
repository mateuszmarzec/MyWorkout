import React from 'react'
import { useTranslation } from 'next-i18next';
import workoutService from '../../services/workout.service';
import { useSWRConfig } from 'swr';
import CollapsibleDiv from '../divs/CollapsibleDiv';
import RoundedButton from '../buttons/RoundedButton';

function WorkoutActivityTable({slug}) {
    const { t } = useTranslation('workout');
    const { data } = workoutService.useWorkoutActivity(slug)
    const { mutate } = useSWRConfig()

    return (
        <div>
            {/* <table className="min-w-full divide-y divide-gray-200 mt-5">
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

                            </td>
                        </tr>
                    })}
                </tbody>
            </table> */}
            {data && data.workoutexerciseSet.map(workout => {
                return <CollapsibleDiv key={workout.exercise.name} title={workout.exercise.name}>
                    <div className="p-5 flex">
                    {workout.sets.map((set, index) => {
                        return <div className="inline-flex p-2" key={set.id}>
                            <div className="flex flex-col">
                                <input onBlur={async() => {
                                    await workoutService.updateWorkoutExerciseSet(set.id, {reps:set.reps, weight:set.weight})
                                    mutate(`/workout-activities/${slug}`)
                                }} inputMode="numeric" pattern="[0-9]*" className="outline-none bg-third font-light text-fourth appearance-none" type="text" maxLength={3} size={3} value={set.reps} name={`reps-${index}`} onChange={(e) => {set.reps=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                                <input onBlur={async() => {
                                    await workoutService.updateWorkoutExerciseSet(set.id, {reps:set.reps, weight:set.weight})
                                    mutate(`/workout-activities/${slug}`)
                                }} inputMode="decimal" pattern="[0-9]*(.[0-9]+)?" maxLength={4} size={4} className="outline-none bg-third font-light text-fourth appearance-none" type="text" value={set.weight} name={`weight-${index}`} onChange={(e) => {set.weight=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                            </div>
                        </div>      
                    })}
                    <RoundedButton
                        onClick={async() => {
                            workout.sets =[...workout.sets, {weight: 0, reps: 0}]
                            mutate(`/workout-activities/${slug}`, {...data}, false)
                            await workoutService.addWorkoutExerciseSet({workoutExercise: workout.id, reps:0, weight: 0})
                            mutate(`/workout-activities/${slug}`)
                        }}
                    >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </RoundedButton>
                    </div>
                </CollapsibleDiv>
            })}
        </div>
    )
}

export default WorkoutActivityTable
