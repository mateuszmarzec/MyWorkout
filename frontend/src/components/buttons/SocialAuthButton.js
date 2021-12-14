import React from 'react'

function SocialAuthButton({children, isSubmitting, ...props}) {
    return (
        <button
            className="border border-secondary bg-secondary w-[49%] rounded-[.375rem] px-[32px] py-[6px] text-third hover:bg-third hover:text-secondary"
            {...props}
        >   
        {!isSubmitting? children: 
            <svg className="animate-spin h-[35px] w-[35px] m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
        </button>
    )
}

export default SocialAuthButton
