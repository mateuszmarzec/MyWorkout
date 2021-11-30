import React from 'react'

function Error({children}) {

    return (
        <div className="relative my-4 py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
            <p>{children}</p>
        </div>
    )
}

export default Error
