import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import { useSelector } from 'react-redux';
import { selectApp } from '../../features/appSlice';


function PermissionWrapper({ children}) {
    const { replace, pathname } = useRouter()
    const isLoggedIn = useSelector(selectApp).isLoggedIn;
    

    useEffect(() => {
        (isLoggedIn === false) && replace(`login/?next=${pathname}`)
    }, [isLoggedIn])

    return (
        <>
            {isLoggedIn && children}
        </>
    )
}

export default PermissionWrapper