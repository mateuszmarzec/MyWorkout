from dj_rest_auth.forms import AllAuthPasswordResetForm
from allauth.account.adapter import get_adapter
from allauth.account.forms import \
    ResetPasswordForm as DefaultPasswordResetForm
from allauth.account.forms import default_token_generator


class PasswordResetForm(AllAuthPasswordResetForm):
    def save(self, request, **kwargs):
        email = self.cleaned_data['email']
        token_generator = kwargs.get('token_generator', default_token_generator)

        for user in self.users:
            temp_key = token_generator.make_token(user)
            get_adapter(request).send_password_reset_confirm_mail(request=request, user=user, token=temp_key)
        return self.cleaned_data['email']
