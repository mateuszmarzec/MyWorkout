import React from 'react';
import authService from '../../services/auth.service';

function LoggedInPermission({children}) {
    const { user } = authService.useUser()

    return (
        <>
            {user && children}
        </>
    )
}

export default LoggedInPermission;