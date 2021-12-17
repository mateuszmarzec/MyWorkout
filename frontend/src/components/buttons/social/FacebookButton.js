import React, { useState } from 'react'
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
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFacebookResponse = async (response) => {
        try{
            await authService.facebookLogin(response.accessToken)
        }
        catch(err){
            setErrors(t('error'))
            setIsSubmitting(false)
            return
        }
        router.push(`/${router.query.next || "workout-plans"}`)
    };

    return (
        <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={handleFacebookResponse}
        disableMobileRedirect={true}
        render={renderProps => (
            <SocialAuthButton isSubmitting={isSubmitting} onClick={() => {renderProps.onClick(), setIsSubmitting(true)}}><FontAwesomeIcon icon={faFacebook} size="2x"/></SocialAuthButton>
        )}
    />
    )
}

export default FacebookButton
