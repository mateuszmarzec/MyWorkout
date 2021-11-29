import React from 'react'
import { capitalize } from '../../utils/extraFunctions';
import { useField } from 'formik';


function StyledTextInput({label, error, ...props}) {
    const [field, meta] = useField(props);

    return (
        <>
            <input
                className={"rounded-[8px] border shadow-input font-light box-border font-[16px] h-[56px] p-[16px] w-full border-fifth focus:outline-none focus:border-secondary " + (error ? "border-red-700": "")}
                {...props}
                {...field}
            />
            {error && <p className="text-red-700">{capitalize(error)}</p>}
        </>
    )
}

export default StyledTextInput