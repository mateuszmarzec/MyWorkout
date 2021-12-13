import React from 'react'
import { Form } from 'formik';
import StyledTextInput from '../../inputs/StyledTextInput';
import { useTranslation } from 'next-i18next';

function ExerciseForm({index, exercise, remove}) {
    const { t } = useTranslation('workout')

    return (
        <Form>
            <div className="row" key={index}>
                <div className="col">
                    <StyledTextInput 
                        id="name"
                        name={`exercise.${index}.exercise`}
                        type="text"
                        required
                        placeholder={t('exercise')}
                    />
                </div>
                <div className="col">
                <button
                    type="button"
                    className="secondary"
                    onClick={() => remove(index)}
                >
                    X
                </button>
                </div>
            </div>
        </Form>
    )
}

export default ExerciseForm
