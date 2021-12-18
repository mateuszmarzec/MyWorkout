import React, { useState } from 'react'
import { Formik, FieldArray } from 'formik';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import validationSchema from './validationSchema';
import initialValues from './initialValues';;
import ExerciseSelect from '../../inputs/ExerciseSelect';
import workoutService from '../../../services/workout.service';
import Error from '../../alerts/Error';
import { useRouter } from 'next/router';

const WorkoutForm = () => {
    const { t } = useTranslation(['workout', 'common'])
    const [addErrors, setAddErrors] = useState(false)
    const router = useRouter()

    const handleAdd = async (data, {setSubmitting}) => {
        const newData = {...data, exercises: data.exercises.map(({value, label}) => {return value})}
        try{
            await workoutService.addWorkoutPlan(newData)
        }
        catch(err){
            setAddErrors(error.response.data)
        }
        router.push("/workouts")
    }

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="md:max-w-lg w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('addWorkoutPlan')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={handleAdd} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange, setFieldValue, setFieldTouched}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        {addErrors && typeof registerErrors === 'string' && <Error>{t('common:error')}</Error>}
                        <div className="rounded-md mb-6">
                            <StyledTextInput 
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder={t('name')}
                                errors={addErrors.name}
                            />
                            <ExerciseSelect
                                id="exercises"
                                name="exercises"
                                value={values.exercises}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                errors={addErrors.exercises}
                            />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} isSubmitting={isSubmitting} text={t('addWorkoutPlan')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default WorkoutForm
