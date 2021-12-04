from django.conf import settings
from allauth.account.models import EmailConfirmation


def get_email_confirmation_url(site_url: str, emailconfirmation: EmailConfirmation):
    ret = f"{site_url}{settings.EMAIL_ACTIVATION_URL}?key={emailconfirmation.key}"
    return ret