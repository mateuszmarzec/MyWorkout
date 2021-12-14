import React, { useState } from 'react'
import { Form } from 'formik';
import StyledTextInput from '../../inputs/StyledTextInput';
import { useTranslation } from 'next-i18next';
import workoutService from '../../../services/workout.service';
import AsyncSelect from 'react-select/async'

function ExerciseForm({index, exercise, remove}) {
    const { t } = useTranslation('workout')
    const [options, setOptions] = useState([])

    const handleInputChange = async(value) => {
        const options = await workoutService.getExercises(value)
        setOptions(options);
    };

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
                <AsyncSelect 
                    name={`exercise.${index}.exercise`}
                    options={options}
                    value={(options ? options.find(option => option.value === field.value) : '')}
                    onInputChange={handleInputChange}
                />
            </div>
        </Form>
    )
}

export default ExerciseForm
