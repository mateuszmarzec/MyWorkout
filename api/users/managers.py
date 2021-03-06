from typing import Any

from allauth.account.models import EmailAddress
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(
        self, email: str, password: str, **extra_fields: Any
    ) -> Any:
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        EmailAddress.objects.create(email=email, user=user, primary=True)
        return user

    def create_user(
        self, email: str, password: str, **extra_fields: Any
    ) -> Any:
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_active", True)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(
        self, email: str, password: str, **extra_fields: Any
    ) -> Any:
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)
