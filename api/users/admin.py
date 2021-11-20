from typing import Tuple

from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import Group as UserGroup
from .models import User, Email


def send_activation_email(modeladmin, request, queryset) -> None:
    for user in queryset:
        user.send_email(
            email=Email.objects.get(code="activate"), context={"elo": "elo"}
        )


send_activation_email.short_description = "Send activation email"


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    actions: list = [send_activation_email]
    list_display: list = [
        "email",
        "first_name",
        "last_name",
        "date_joined",
        "is_active",
    ]
    ordering: list = ["date_joined", "last_login", "email"]
    exclude: list = ["username"]
    search_fields: list = ["email", "first_name", "last_name"]
    fieldsets: Tuple[tuple] = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets: Tuple[tuple] = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    readonly_fields: list = ["date_joined"]


@admin.register(UserGroup)
class GroupAdmin(GroupAdmin):
    pass


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "subject",
    )


admin.site.unregister(Group)
