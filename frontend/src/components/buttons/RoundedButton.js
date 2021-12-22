import React from 'react'

function RoundedButton({children, ...props}) {
    return (
        <button className="my-auto border border-secondary inline-flex items-center justify-center bg-secondary min-w-[1.5rem] min-h-[1.5rem] rounded-full text-third hover:bg-third hover:text-secondary text-xl" {...props}>
            {children}
        </button>
    )
}

export default RoundedButton
