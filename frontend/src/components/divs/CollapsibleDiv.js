import React, { useState } from 'react'

function CollapsibleDiv({title, children}) {
    const [isCollapsed, setIsCollapsed] = useState(true)


    return (
        <div className="border rounded my-3 shadow-sm">
            <label className="block p-5 leading-normal cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>{title}</label>
            <div className={`tab-content overflow-hidden leading-normal transition-[max-height] duration-500 ease-in-out ${isCollapsed? "max-h-0" : "max-h-[1000px]"}`}>
                {children}
            </div>
        </div>
    )
}

export default CollapsibleDiv