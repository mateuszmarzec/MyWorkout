from api.settings.base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
import os

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
