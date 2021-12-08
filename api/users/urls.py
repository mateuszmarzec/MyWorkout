from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import include, path

from users.views import FacebookLogin, GoogleLogin, RegisterView, ValidateEmailView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("registration/", view=RegisterView.as_view(), name="register-view"),
    path(
        "registration/verify-email/",
        view=VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "validate-email/<email>",
        view=ValidateEmailView.as_view(),
        name="validate-email",
    ),
    path("social/facebook/", FacebookLogin.as_view(), name="fb-login"),
    path("social/google/", GoogleLogin.as_view(), name="google-login"),
]
