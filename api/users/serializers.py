from dj_rest_auth.serializers import LoginSerializer
from dj_rest_auth.serializers import (
    PasswordResetSerializer as BasePasswordResetSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    Serializer,
)
from rest_framework.validators import UniqueValidator

from users.forms import PasswordResetForm

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


class ValidateEmailSerializer(Serializer):
    email = EmailField(
        allow_blank=False,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )


class PasswordResetSerializer(BasePasswordResetSerializer):
    @property
    def password_reset_form_class(self):
        return PasswordResetForm
