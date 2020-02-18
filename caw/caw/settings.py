"""
Django settings for caw project.

Generated by 'django-admin startproject' using Django 3.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import environ


root = environ.Path(__file__) - 3  # three folder back (/a/b/c/ - 3 = /)
env = environ.Env(DEBUG=(bool, False),)  # set default values and casting
environ.Env.read_env()  # reading .env file

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_PATH = os.path.abspath(os.path.dirname(__file__))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
if os.environ.get('SECRET_KEY'):
    SECRET_KEY = os.environ.get('SECRET_KEY')
else:
    SECRET_KEY = '_i@@y#sw+z^q1+xk2wbr2$cz1$-ll44(!f74lce!e$qkw$i(dg'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')
# SLACK_ENDPOINT = env('SLACK_ENDPOINT')


if not DEBUG:
    ALLOWED_HOSTS = [env('SITE_HOST'), ]
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]']
if os.environ.get('HOSTS'):
    ALLOWED_HOSTS.append(os.environ.get('HOSTS'))




# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',


    # our own apps
    "styleguide",
    "tags",

    # dependencies
    'rest_framework', # REST API Utils
    'tinymce',        # Rich text editor
    'markdownx',      # Markdown editor ()
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'caw.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'caw.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': env.db()
}

# AUTH_USER_MODEL = 'user_profile.User'

# Authentication settings for python social auth
AUTHENTICATION_BACKENDS = (
    # SLACK SOCIAL AUTH
    # 'user_profile.backend.UserProfileSlackAuth',
    'django.contrib.auth.backends.ModelBackend',
)



# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = False

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# Tiny MC: the rich text editor
TINYMCE_DEFAULT_CONFIG={
    'plugins': "table,spellchecker,paste,searchreplace",
    'theme': "advanced",
    'cleanup_on_startup': True,
    'custom_undo_redo_levels': 10,
    'relative_urls': False,
    # # "plugins": [
    #     'advlist autolink lists link image charmap print preview anchor',
    #     'searchreplace visualblocks code fullscreen',
    #     'insertdatetime media table paste code help wordcount'
    # # ],
    "toolbar": 'undo redo | formatselect |  bold italic backcolor | alignleft aligncenter  alignright alignjustify | bullist numlist outdent indent | removeformat | help'
}
TINYMCE_SPELLCHECKER = True
TINYMCE_COMPRESSOR = True