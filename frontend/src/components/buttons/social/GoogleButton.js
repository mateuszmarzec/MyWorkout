import React from 'react'
import authService from '../../../services/auth.service';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/authSlice';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import SocialAuthButton from '../SocialAuthButton';


function GoogleButton({handleGoogleErrorResponse}) {
    const dispatch = useDispatch()

    const handleGoogleResponse = async (response) => {
        dispatch(login({data: response.accessToken, loginFunction: authService.googleLogin}))
    };

    return (
        <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleErrorResponse}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
            <SocialAuthButton onClick={renderProps.onClick}><FontAwesomeIcon icon={faGoogle} size="2x"/></SocialAuthButton>
        )}
        />
    )
}

export default GoogleButton
