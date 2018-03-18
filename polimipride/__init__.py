import os
from functools import partial

import flask
from flask import Flask, g
from flask_babel import Babel
from flask_frozen import Freezer
from werkzeug.exceptions import NotFound

from .config import DefaultConfig

app = Flask(__name__)
app.config.from_object(DefaultConfig)

# Load config from environment variable

if 'POLIMIPRIDE_CONFIG' in os.environ:
    app.config.from_envvar('POLIMIPRIDE_CONFIG')

# Include some static files in root directory

ROOT_ASSETS = ('CNAME',)
for asset in ROOT_ASSETS:
    url = "/" + asset
    name = asset.replace(".", "_")
    app.add_url_rule(url, name, partial(app.send_static_file, filename=asset))

# Register localization and static site generation modules

babel = Babel(app)
freezer = Freezer(app)


def url_for_self(**args):
    return flask.url_for(flask.request.endpoint, **dict(flask.request.view_args, **args))


app.jinja_env.globals['url_for_self'] = url_for_self


# Localization functions

@babel.localeselector
def get_locale():
    return g.get('lang_code', app.config['BABEL_DEFAULT_LOCALE'])


@babel.timezoneselector
def get_timezone():
    user = g.get('user', None)
    if user is not None:
        return user.timezone


@app.url_defaults
def set_language_code(endpoint, values):
    if 'lang_code' in values or not g.get('lang_code', None):
        return
    if app.url_map.is_endpoint_expecting(endpoint, 'lang_code'):
        values['lang_code'] = g.lang_code


@app.url_value_preprocessor
def get_lang_code(endpoint, values):
    if values is not None:
        g.lang_code = values.pop('lang_code', None)


@app.before_request
def ensure_lang_support():
    lang_code = g.get('lang_code', None)
    if lang_code and lang_code not in app.config['SUPPORTED_LANGUAGES'].keys():
        raise NotFound()


# Now load and register views and commands

from .views import *
from .cli import *
