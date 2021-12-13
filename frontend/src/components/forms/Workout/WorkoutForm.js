import React, { useState } from 'react'
import { Formik, FieldArray } from 'formik';
import { useTranslation } from 'next-i18next';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';
import Error from '../../alerts/Error';
import validationSchema from './validationSchema';
import initialValues from './initialValues';
import ExerciseForm from './ExerciseForm';

const WorkoutForm = () => {
    const { t } = useTranslation('workout')

    return (
        <div className="min-h-full flex items-center justify-center">
            <div className="md:max-w-lg w-full space-y-4">
                <div>
                    <h2 className="text-primary mt-6 text-center text-3xl font-bold">{t('sign_in')}</h2>
                </div>
                <Formik validationSchema={validationSchema} validateOnChange={false} validateOnBlur={false} onSubmit={console.log("ELO")} initialValues={initialValues}>
                {({values, touched, errors, handleSubmit, isSubmitting, handleChange}) => (
                    <form className="mt-8" onSubmit={handleSubmit} noValidate>
                        <div className="rounded-md space-y-4 mb-6">
                            <StyledTextInput 
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder={t('name')}
                            />
                            <FieldArray
                                name="exercises"
                                render={({ insert, remove, push }) => (
                                    <div>
                                    {values.exercises.length > 0 &&
                                        values.exercises.map((exercise, index) => (
                                            <ExerciseForm key={index} index={index} exercise={exercise} remove={remove} />
                                        ))}
                                    <button
                                        type="button"
                                        className="secondary"
                                        onClick={() => push({ exercise: ""})}
                                    >
                                        {t('addExercise')}
                                    </button>
                                    </div>
                                )}
                                />
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} text={t('addWorkout')} />
                        </div>
                    </form>
                    )}
                    </Formik>
                    </div>
                </div>
    );
}

export default WorkoutForm