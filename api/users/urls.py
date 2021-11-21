from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from users.views import TokenObtainView, CurrentUserView

urlpatterns = [
    path('token/obtain/', view=TokenObtainView.as_view(), name='obtain-token'),
    path('token/refresh/', view=TokenRefreshView.as_view(), name='refresh-token'),
    path('current-user/', view=CurrentUserView.as_view(), name='current-user'),
]
