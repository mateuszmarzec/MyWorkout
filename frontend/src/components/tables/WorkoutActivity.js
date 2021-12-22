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
            {data && data.workoutexerciseSet.map((workout, workoutIndex) => {
                return <CollapsibleDiv key={workoutIndex} title={workout.exercise.name}>
                    <div className="p-5 flex overflow-y-scroll">
                    {workout.sets.map((set, index) => {
                        return <div className="inline-flex p-2" key={index}>
                            <div className="flex flex-col space-y-1">
                                <input onBlur={async() => {
                                    if (set.id) {
                                        await workoutService.updateWorkoutExerciseSet(set.id, {reps:Number(set.reps), weight:Number(set.weight)})
                                    }
                                    else {
                                        if (!(set.reps && set.weight)) {
                                            return
                                        }
                                        await workoutService.addWorkoutExerciseSet({workoutExercise: workout.id, reps:Number(set.reps), weight:Number(set.weight)})
                                    }
                                    mutate(`/workout-activities/${slug}`)
                                }} inputMode="numeric" pattern="[0-9]*" className="outline-none bg-third font-light text-fourth appearance-none" placeholder={0} type="text" maxLength={3} size={3} value={set.reps} id={`${workoutIndex}-reps-${index}`} name={`reps-${index}`} onChange={(e) => {set.reps=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                                <input onBlur={async() => {
                                    if (set.id) {
                                        await workoutService.updateWorkoutExerciseSet(set.id, {reps:Number(set.reps), weight:Number(set.weight)})
                                    }
                                    else {
                                        if (!(set.reps && set.weight)) {
                                            return
                                        }
                                        await workoutService.addWorkoutExerciseSet({workoutExercise: workout.id, reps:Number(set.reps), weight:Number(set.weight)})
                                    }
                                    mutate(`/workout-activities/${slug}`)
                                }} inputMode="decimal" pattern="[0-9]*(.[0-9]+)?" maxLength={4} size={4} className="outline-none bg-third font-light text-fourth appearance-none" placeholder={"0.0"} type="text" value={set.weight} id={`${workoutIndex}-weight-${index}`} name={`weight-${index}`} onChange={(e) => {set.weight=e.target.value, mutate(`/workout-activities/${slug}`, {...data}, false)}}></input>
                            </div>
                        </div>      
                    })}
                    <RoundedButton
                        onClick={async() => {
                            workout.sets =[...workout.sets, {weight: null, reps: null}]
                            await mutate(`/workout-activities/${slug}`, {...data}, false)
                            document.getElementById(`${workoutIndex}-reps-${workout.sets.length-1}`).focus();
                            // await workoutService.addWorkoutExerciseSet({workoutExercise: workout.id})
                            // mutate(`/workout-activities/${slug}`)
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
