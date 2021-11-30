import React from 'react'

function Success({children}) {

    return (
        <div className="relative my-4 py-3 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg" role="alert">
            <p>{children}</p>
        </div>
    )
}

export default Success
