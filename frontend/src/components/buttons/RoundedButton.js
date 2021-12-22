import React from 'react'

function RoundedButton({children, ...props}) {
    return (
        <button className="my-auto border border-secondary inline-flex items-center justify-center bg-secondary w-6 h-6 rounded-full text-third hover:bg-third hover:text-secondary text-xl" {...props}>
            {children}
        </button>
    )
}

export default RoundedButton
