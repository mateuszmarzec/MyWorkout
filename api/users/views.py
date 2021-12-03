from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import RegisterView as BaseRegisterView
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.utils import jwt_encode
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from allauth.account.utils import complete_signup
from allauth.account import app_settings as allauth_settings
from django.urls import NoReverseMatch

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
        try:
            complete_signup(
                self.request._request, user,
                allauth_settings.EMAIL_VERIFICATION,
                None,
            )
        except NoReverseMatch:
            pass
        return user


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    client_class = OAuth2Client
    adapter_class = GoogleOAuth2Adapter


@csrf_exempt
def google_token(request):

    if "code" not in request.body.decode():
        from rest_framework_simplejwt.settings import api_settings as jwt_settings
        from rest_framework_simplejwt.views import TokenRefreshView

        class RefreshAuth(TokenRefreshView):
            # By default, Nuxt auth accept and expect postfix "_token"
            # while simple_jwt library doesnt accept nor expect that postfix
            def post(self, request, *args, **kwargs):
                request.data._mutable = True
                request.data["refresh"] = request.data.get("refresh_token")
                request.data._mutable = False
                response = super().post(request, *args, **kwargs)
                response.data["refresh_token"] = response.data["refresh"]
                response.data["access_token"] = response.data["access"]
                return response

        return RefreshAuth.as_view()(request)

    else:
        return GoogleLogin.as_view()(request)
