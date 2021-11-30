from django.contrib.auth import get_user_model
from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    Serializer,
    ValidationError,
)
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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


class TokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: dict) -> dict:
        data: dict = super().validate(attrs)
        user: dict = UserSerializer(self.user).data
        data.update(user=user)
        return data


class CustomerSerializer(Serializer):
    email = EmailField(
        allow_blank=False,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = CharField(allow_blank=False, min_length=9)
    password_confirmation = CharField(allow_blank=False, min_length=9)

    def validate(self, attrs: dict) -> dict:
        data: dict = super().validate(attrs)
        if data["password"] != data["password_confirmation"]:
            raise ValidationError("Passwords don't match")

        return data


class ActivationSerializer(Serializer):
    uidb64 = CharField(allow_blank=False)
    token = CharField(allow_blank=False)


class ValidateEmailSerializer(Serializer):
    email = EmailField(allow_blank=False, validators=[UniqueValidator(queryset=User.objects.all())])
