from django.conf import settings
from allauth.account.models import EmailConfirmation


def get_email_confirmation_url(request, emailconfirmation: EmailConfirmation):
    ret = build_absolute_uri(request, f"{settings.EMAIL_ACTIVATION_URL}?key={emailconfirmation.key}")
    return ret