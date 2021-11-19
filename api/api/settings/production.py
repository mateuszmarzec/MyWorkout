from api.settings.base import *
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
import os
import dj_database_url

DEBUG = False

STATIC_URL = "/staticfiles/" 
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

sentry_sdk.init(
    dsn=os.environ.get('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)

DATABASES = {'default': dj_database_url.config(conn_max_age=600, ssl_require=True)}
