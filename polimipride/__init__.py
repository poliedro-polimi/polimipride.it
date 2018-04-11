import os, subprocess
from functools import partial

import flask
from flask import Flask, g, request
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
    url = "/" + os.path.basename(asset)
    name = asset.replace(".", "_").replace("/", "_")
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


@app.url_defaults
def hashed_url_for_static_file(endpoint, values):
    if 'static' == endpoint or endpoint.endswith('.static'):
        filename = values.get('filename')
        if filename:
            if '.' in endpoint:  # has higher priority
                blueprint = endpoint.rsplit('.', 1)[0]
            else:
                blueprint = request.blueprint  # can be None too

            if blueprint:
                static_folder = app.blueprints[blueprint].static_folder
            else:
                static_folder = app.static_folder

            param_name = 'c'
            while param_name in values:
                param_name = '_' + param_name
            values[param_name] = static_file_hash(os.path.join(static_folder, filename))


def static_file_hash(filename):
    if getattr(g, "_last_static_hash", None) is None:
        # noinspection PyBroadException
        try:
            out = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=os.path.dirname(filename))
            g._last_static_hash = out.strip()
        except Exception:
            import traceback
            traceback.print_exc()
            return int(os.stat(filename).st_mtime)

    return g._last_static_hash


# Now load and register views and commands

from .views import *
from .cli import *
