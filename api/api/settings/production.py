from api.settings.base import *
import os

DEBUG = False

STATIC_URL = "/staticfiles/" 
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")