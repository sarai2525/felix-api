"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from dotenv import load_dotenv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()


load_dotenv('../.env')

env_state = os.getenv('ENV_STATE','local')
if env_state=='production':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
elif env_state=='staging':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.staging')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
