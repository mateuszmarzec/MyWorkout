from allauth.account.models import EmailConfirmation
from django.conf import settings


def get_email_confirmation_url(
    site_url: str, emailconfirmation: EmailConfirmation
) -> str:
    ret = f"{site_url}{settings.EMAIL_ACTIVATION_URL}?key={emailconfirmation.key}"
    return ret


def get_password_reset_confirm_url(
    site_url: str, user_id: str, token: str
) -> str:
    ret = f"{site_url}{settings.PASSWORD_RESET_CONFIRM_URL}?userId={user_id}&token={token}"
    return ret
