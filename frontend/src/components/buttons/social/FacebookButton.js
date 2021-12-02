import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import authService from '../../../services/auth.service';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/authSlice';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import SocialAuthButton from '../SocialAuthButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FacebookButton() {
    const dispatch = useDispatch()

    const handleFacebookResponse = async (response) => {
        dispatch(login({data: response.accessToken, loginFunction: authService.facebookLogin}))
    };

    return (
        <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        render={renderProps => (
            <SocialAuthButton onClick={renderProps.onClick}><FontAwesomeIcon icon={faFacebook} size="2x"/></SocialAuthButton>
        )}
    />
    )
}

export default FacebookButton
