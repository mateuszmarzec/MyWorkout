from django.contrib.auth import get_user_model
from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    Serializer,
)
from rest_framework.validators import UniqueValidator
from dj_rest_auth.serializers import LoginSerializer

User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
        )


class TokenObtainSerializer(LoginSerializer):
    def validate(self, attrs: dict):
        attrs = super().validate(attrs)
        return attrs


class ActivationSerializer(Serializer):
    uidb64 = CharField(allow_blank=False)
    token = CharField(allow_blank=False)


class ValidateEmailSerializer(Serializer):
    email = EmailField(
        allow_blank=False,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
