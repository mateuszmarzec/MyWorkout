from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import Group, PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.template import Context, Template

from users.managers import UserManager


class Email(models.Model):
    code = models.CharField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    from_email = models.EmailField("from", max_length=200)

    class Meta:
        verbose_name = "email"
        verbose_name_plural = "emails"

    def __str__(self) -> str:
        return self.code


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("email address", unique=True)
    first_name = models.CharField("first name", max_length=30, blank=True)
    last_name = models.CharField("last name", max_length=30, blank=True)
    date_joined = models.DateTimeField("date joined", auto_now_add=True)
    is_active = models.BooleanField("active", default=False)
    is_staff = models.BooleanField("staff", default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def send_email(self, email: Email, context: dict) -> bool:
        context = Context(context)
        template = Template(email.message)
        send_mail(
            email.subject,
            template.render(context),
            email.from_email,
            [self.email],
        )
        return True


class Group(Group):
    class Meta:
        proxy = True
        app_label = "users"
