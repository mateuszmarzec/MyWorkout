import React from 'react'

function Item({children, ...props}) {
    return (
        <div className="py-6" {...props}>
            {children}
        </div>
    )
}
export default Item
