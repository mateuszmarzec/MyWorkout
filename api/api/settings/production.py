import os

import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from api.settings.base import *

DEBUG = False

STATIC_URL = "/staticfiles/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN"),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True,
)

DATABASES = {
    "default": dj_database_url.config(conn_max_age=600, ssl_require=True)
}

CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 60 * 60 * 24 * 7 * 52  # one year
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_SSL_REDIRECT = True
# SECURE_BROWSER_XSS_FILTER = True
# SECURE_CONTENT_TYPE_NOSNIFF = True
# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True

# Mailing
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
