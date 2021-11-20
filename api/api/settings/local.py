from api.settings.base import *

DEBUG = True

ALLOWED_HOSTS.append("localhost")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
