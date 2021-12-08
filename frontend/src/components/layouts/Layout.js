import React from 'react'
import Head from 'next/head'
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts"


function Layout({children}) {
    return (
        <div>
            <Head>
                {GoogleFonts()}
                <title>My Workout</title>
            </Head>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout