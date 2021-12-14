import React from 'react'

function TableButton({text, ...props}) {
    return (
        <button
            className="border border-secondary bg-secondary rounded-[.375rem] px-[16px] py-[8px] text-third hover:bg-third hover:text-secondary text-lg"
            {...props}
        >
            {text}   
        </button>
    )
}

export default TableButton
