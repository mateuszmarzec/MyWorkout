import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from api.settings.base import *

DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
