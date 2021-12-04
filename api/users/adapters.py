from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.models import EmailConfirmation
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from users.utils import get_email_confirmation_url
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from users.models import User, Email



class AccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation: EmailConfirmation, signup: bool):
        current_site = get_current_site(request)
        activate_url = get_email_confirmation_url(current_site.domain, emailconfirmation)
        user: User = emailconfirmation.email_address.user
        context_data = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        email = Email.objects.get(code='confirmation')
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
