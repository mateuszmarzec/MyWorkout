import React from 'react';
import authService from '../../services/auth.service';

function LoggedOutPermission({children}) {
    const { user, isValidating } = authService.useUser()

    return (
        <>
            {!isValidating && !user && children}
        </>
    )
}

export default LoggedOutPermission;