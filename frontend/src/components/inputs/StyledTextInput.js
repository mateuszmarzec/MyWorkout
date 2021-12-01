import React from 'react'
import { capitalize } from '../../utils/extraFunctions';
import { useField } from 'formik';


function StyledTextInput({errors, ...props}) {
    const [field, meta] = useField(props);

    return (
        <div className="mb-4">
            <input
                className={"rounded-[8px] border shadow-input font-light box-border font-[16px] h-[56px] p-[16px] w-full border-fifth focus:outline-none focus:border-secondary " + (meta.touched && !!meta.error ? "border-red-700": "")}
                {...props}
                {...field}
            />
            {meta.touched && !!meta.error && <p className="text-red-700 font-normal text-sm pl-2">{capitalize(meta.error)}</p>}
            {meta.touched && !!errors && <p className="text-red-700 font-normal text-sm pl-2">{errors.join(" ")}</p>}
        </div>
    )
}

export default StyledTextInput