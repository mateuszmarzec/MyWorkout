from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.conf import settings
from django.db import transaction
from django.utils.encoding import force_bytes, force_text

from users.models import Email
from users.serializers import (ActivationSerializer, CustomerSerializer,
                          TokenObtainSerializer, UserSerializer, ValidateEmailSerializer)

User = get_user_model()


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class TokenObtainView(TokenObtainPairView):
    serializer_class = TokenObtainSerializer


class RegisterView(APIView):
    serializer_class = CustomerSerializer

    def post(self, request, *args, **kwargs) -> Response:
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                data: dict = serializer.validated_data
                user: User = User.objects.create_user(
                    email=data['email'],
                    password=data["password"]
                )
                self.send_activation_email(user=user)
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def send_activation_email(user: User):
        user_uid: str = urlsafe_base64_encode(force_bytes(user.pk))
        token: str = default_token_generator.make_token(user)

        activation_link: str = f'{settings.BASE_URL}/activate/{user_uid}/{token}'
        print(activation_link)
        # user.send_email(
        #     email=Email.objects.get(code='activate'), context={'activation_link': activation_link}
        # )


class ActivationView(APIView):
    serializer_class = ActivationSerializer

    def post(self, request, *args, **kwargs):
        serializer = ActivationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                uid: str = force_text(urlsafe_base64_decode(serializer.validated_data['uidb64']))
                user: User = User.objects.get(pk=uid) 
            except(TypeError, ValueError, OverflowError, User.DoesNotExist):
                user = None
                
            if user is not None and default_token_generator.check_token(user, serializer.validated_data['token']):
                user.is_active = True
                user.save()
                return Response(serializer.validated_data, status=status.HTTP_200_OK)
            return Response("Activation link is invalid!", status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ValidateEmailView(APIView):
    serializer_class = ValidateEmailSerializer

    def get(self, request, *args, **kwargs):
        serializer = ValidateEmailSerializer(data={'email': kwargs['email']})
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
