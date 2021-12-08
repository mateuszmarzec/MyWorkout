from api.settings.base import *

DEBUG = True

ALLOWED_HOSTS.append("localhost")
INSTALLED_APPS.append("corsheaders")

CORS_ALLOWED_ORIGINS = ["http://localhost:8000"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

MIDDLEWARE.insert(2, "corsheaders.middleware.CorsMiddleware")

# Mailing
EMAIL_BACKEND = "django.core.mail.backends.dummy.EmailBackend"
