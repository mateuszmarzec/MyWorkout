import React from 'react'
import authService from '../../../services/auth.service';
import { GoogleLogin } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import SocialAuthButton from '../SocialAuthButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';


function GoogleButton({setErrors}) {
    const router = useRouter()
    const { t } = useTranslation('common')

    const handleGoogleResponse = async (response) => {
        try {
            await authService.googleLogin(response.accessToken)
        }
        catch (err) {
            setErrors(t('error'))
            return
        }
        router.push(`/${router.query.next || "workouts"}`)
    };

    return (
        <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onSuccess={handleGoogleResponse}
        onFailure={() => setErrors(t('error'))}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
            <SocialAuthButton onClick={renderProps.onClick}><FontAwesomeIcon icon={faGoogle} size="2x"/></SocialAuthButton>
        )}
        />
    )
}

export default GoogleButton
