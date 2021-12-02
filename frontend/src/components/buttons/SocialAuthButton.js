import React from 'react'

function SocialAuthButton({children, ...props}) {
    return (
        <button
            className="border border-secondary bg-secondary w-[49%] rounded-[8px] px-[32px] py-[6px] text-third hover:bg-third hover:text-secondary"
            {...props}
        >   
            {children}
        </button>
    )
}

export default SocialAuthButton
