from api.settings.base import *

DEBUG = True

ALLOWED_HOSTS.append("localhost")
BASE_URL = "http://localhost"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Mailing
EMAIL_BACKEND = 'django.core.mail.backends.dummy.EmailBackend'
