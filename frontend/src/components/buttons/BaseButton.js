import React from 'react'

function BaseButton({text, ...props}) {
    return (
        <button
            className="border border-secondary bg-secondary w-full rounded-[8px] px-[32px] py-[16px] text-third hover:bg-third hover:text-secondary"
            {...props}
        >   
            {text}
        </button>
    )
}

export default BaseButton
