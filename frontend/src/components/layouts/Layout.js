import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../features/currentUserSlice';
import { setIsLoggedIn } from '../../features/appSlice';
import Head from 'next/head'
import { useRouter } from 'next/router'


function Layout({children}) {
    const { pathname } = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.getItem('accessToken') && (dispatch(setIsLoggedIn(true)), dispatch(setCurrentUser()))
    }, []) 

    return (
        <div>
            <Head>
                <title>My Workout</title>
            </Head>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout