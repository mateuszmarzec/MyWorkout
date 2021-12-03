import React from 'react';
import { useSelector } from 'react-redux';
import { selectApp } from '../../features/appSlice'

function LoggedInPermission({children}) {
    const isLoggedIn = useSelector(selectApp).isLoggedIn;

    return (
        <>
            {isLoggedIn && children}
        </>
    )
}

export default LoggedInPermission;