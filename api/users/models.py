from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import Group as BaseGroup
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from django.db import models
from django.db.models import QuerySet
from django.template import Context, Template

from users.managers import UserManager
from workouts import models as workout_models


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
    is_active = models.BooleanField("active", default=True)
    is_staff = models.BooleanField("staff", default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS: list[str] = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def send_email(self, email: Email, context_data: dict) -> bool:
        context = Context(context_data)
        template = Template(email.message)
        send_mail(
            email.subject,
            template.render(context),
            email.from_email,
            [self.email],
        )
        return True

    @property
    def workout_plans(self) -> QuerySet:
        queryset = self.workouts.filter(workout_plan__isnull=True)
        queryset.model = workout_models.WorkoutPlan
        return queryset

    @property
    def workout_activities(self) -> QuerySet:
        queryset = self.workouts.filter(workout_plan__isnull=False)
        queryset.model = workout_models.WorkoutActivity
        return queryset


class Group(BaseGroup):
    class Meta:
        proxy = True
        app_label = "users"
