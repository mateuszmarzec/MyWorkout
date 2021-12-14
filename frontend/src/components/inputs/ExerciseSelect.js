import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import workoutService from '../../services/workout.service';
import { useField } from 'formik';
import { capitalize } from '../../utils/extraFunctions';

function ExerciseSelect({errors, onInputChange, onBlur, onChange, value, ...props}) {
    const [field, meta] = useField(props);
    const [options, setOptions] = useState([])

    const customStyles = {
        control: (provided, state) => ({
        ...provided,
        border: 0,
        minHeight: "54px",
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              backgroundColor: isFocused ? "rgba(var(--secondary), 0.7)": undefined,
              color: isFocused ? "rgb(var(--third))": undefined,
            };
          },
        multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: "rgb(var(--secondary))",
            fontSize: "20px"
        };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: "rgb(var(--third))",
          }),
        multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "rgb(var(--third))",
        ':hover': {
            color: "rgb(var(--third))",
        },
        }),
    }

    const handleChange = value => {
        onChange('exercises', value);
    };
    
    const fetchData = async(value) => {
        const data = await workoutService.getExercises(value)

        return data.map(({name, id}) => {return {value: id, label: name}})
      }

    const handleBlur = () => {
        onBlur('exercises', true);
    };
    
    return (
        <>
            <AsyncSelect
                className={"rounded-[.375rem] border shadow-input font-light box-border font-[16px] border-fifth" + (meta.touched && !!meta.error ? "border-red-700": "")}
                styles={customStyles}
                cacheOptions
                key={value.length}
                isMulti
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                loadOptions={fetchData}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: 'rgb(var(--secondary))',
                    },
                  })}
                {...props}
            />
            {meta.touched && !!meta.error && <p className="text-red-700 font-normal text-sm pl-2">{capitalize(meta.error)}</p>}
            {meta.touched && !!errors && <p className="text-red-700 font-normal text-sm pl-2">{errors.join(" ")}</p>}
        </>
    )
}

export default ExerciseSelect
