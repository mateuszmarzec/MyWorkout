from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailConfirmation
from allauth.account.utils import user_pk_to_url_str
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site

from users.models import Email, User
from users.utils import get_email_confirmation_url, get_password_reset_confirm_url


class AccountAdapter(DefaultAccountAdapter):
    def send_password_reset_confirm_mail(
        self, request, user: User, token: str
    ) -> None:
        current_site = get_current_site(request)
        url = get_password_reset_confirm_url(
            site_url=current_site.domain,
            user_id=user_pk_to_url_str(user),
            token=token,
        )
        context = {
            "current_site": current_site,
            "user": user,
            "password_reset_url": url,
            "request": request,
        }
        email = Email.objects.get(code="password-reset-confirm")
        user.send_email(email=email, context_data=context)

    def send_confirmation_mail(
        self, request, emailconfirmation: EmailConfirmation, signup: bool
    ) -> None:
        current_site = get_current_site(request)
        activate_url = get_email_confirmation_url(
            current_site.domain, emailconfirmation
        )
        user: User = emailconfirmation.email_address.user
        context_data = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        email = Email.objects.get(code="confirmation")
        user.send_email(email=email, context_data=context_data)

    def respond_email_verification_sent(self, request, user: User) -> None:
        return

    def add_message(
        self,
        request,
        level,
        message_template,
        message_context=None,
        extra_tags="",
    ):
        pass


class FacebookAdapter(FacebookOAuth2Adapter):
    def respond_email_verification_sent(self, request, user: User) -> None:
        return

    def add_message(
        self,
        request,
        level,
        message_template,
        message_context=None,
        extra_tags="",
    ):
        pass
