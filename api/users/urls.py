from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users.views import CurrentUserView, TokenObtainView, RegisterView, ActivationView, ValidateEmailView

urlpatterns = [
    path("token/obtain/", view=TokenObtainView.as_view(), name="obtain-token"),
    path(
        "token/refresh/", view=TokenRefreshView.as_view(), name="refresh-token"
    ),
    path("current-user/", view=CurrentUserView.as_view(), name="current-user"),
    path('register/', view=RegisterView.as_view(), name='register'),
    path('activate/', view=ActivationView.as_view(), name='activate'),
    path('validate-email/<email>', view=ValidateEmailView.as_view(), name='validate-email'),
]
