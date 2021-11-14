from api.settings.base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
import os

DEBUG = False

STATIC_URL = "/staticfiles/" 
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

sentry_sdk.init(
    dsn=os.environ['SENTRY_DSN'],
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)
