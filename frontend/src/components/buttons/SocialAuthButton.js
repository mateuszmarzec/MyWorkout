import React from 'react'

function SocialAuthButton({children, ...props}) {
    return (
        <button
            className="border border-secondary bg-secondary w-full rounded-[8px] px-[32px] py-[2px] text-third hover:bg-third hover:text-secondary"
            {...props}
        >   
            {children}
        </button>
    )
}

export default SocialAuthButton
