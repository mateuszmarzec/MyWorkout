from django.urls import path, include

from users.views import (
    RegisterView,
    ValidateEmailView,
    FacebookLogin,
    GoogleLogin
)

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', view=RegisterView.as_view(), name="register-view"),
    path(
        "validate-email/<email>",
        view=ValidateEmailView.as_view(),
        name="validate-email",
    ),
    path('social/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('social/google/', GoogleLogin.as_view(), name='google_login'),
    path('account/', include('allauth.urls')),
]
