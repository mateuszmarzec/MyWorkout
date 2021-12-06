import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import authService from '../../../services/auth.service';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import SocialAuthButton from '../SocialAuthButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function FacebookButton({setErrors}) {
    const router = useRouter()
    const { t } = useTranslation('common')

    const handleFacebookResponse = async (response) => {
        try{
            await authService.facebookLogin(response.accessToken)
        }
        catch(err){
            setErrors(t('error'))
            return
        }
        router.push(`/${router.query.next || "workouts"}`)
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
