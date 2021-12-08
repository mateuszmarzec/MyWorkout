from allauth.account import app_settings as allauth_settings
from allauth.account.utils import complete_signup
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import RegisterView as BaseRegisterView
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.utils import jwt_encode
from django.contrib.auth import get_user_model
from django.urls import NoReverseMatch
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView

from users.adapters import FacebookAdapter
from users.serializers import ValidateEmailSerializer

User = get_user_model()


class ValidateEmailView(APIView):
    serializer_class = ValidateEmailSerializer

    def get(self, request, *args, **kwargs):
        serializer = ValidateEmailSerializer(data={"email": kwargs["email"]})
        if serializer.is_valid():
            return Response(
                serializer.validated_data, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(BaseRegisterView):
    def perform_create(self, serializer: Serializer):
        user = serializer.save(self.request)
        self.access_token, self.refresh_token = jwt_encode(user)
        complete_signup(
            self.request._request,
            user,
            allauth_settings.EMAIL_VERIFICATION,
            None,
        )
        return user


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookAdapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
