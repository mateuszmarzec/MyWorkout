import React from 'react'
import { Formik } from 'formik';
import StyledTextInput from '../../inputs/StyledTextInput';
import BaseButton from '../../buttons/BaseButton';

function ExerciseForm() {
    return (
        <div>
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
                        </div>
                        <div>
                            <BaseButton type="submit" disabled={isSubmitting} text={t('add_exercise')} />
                        </div>
                    </form>
                    )}
                    </Formik>
        </div>
    )
}

export default ExerciseForm
