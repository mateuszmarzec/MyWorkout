import React from 'react'

function StyledTextArea(props) {
    return (
        <div className="mb-4">
            <textarea
                className={"rounded-[8px] border shadow-input font-light box-border font-[16px] h-[56px] p-[16px] w-full border-fifth focus:outline-none focus:border-secondary"}
                {...props}
            />
        </div>
    )
}

export default StyledTextArea
