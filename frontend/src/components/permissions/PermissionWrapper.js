import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import authService from '../../services/auth.service'


function PermissionWrapper({ children}) {
    const { replace, pathname } = useRouter()
    const { user, isValidating } = authService.useUser()

    useEffect(() => {
        if (!(user || isValidating)) {
          replace(`login/?next=${pathname}`)
        }
    }, [user, isValidating])

    return (
        <>
            {user && children}
        </>
    )
}

export default PermissionWrapper