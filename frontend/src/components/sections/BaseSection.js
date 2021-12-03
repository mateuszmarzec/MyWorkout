import React from 'react'

function BaseSection({children}) {
    return (
        <section className="py-20">
            <div className="2xl:max-w-XlMax 2xl:mx-auto mx-6 xl:mx-20">
                {children}
            </div>
        </section>
    )
}

export default BaseSection
