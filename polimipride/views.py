from flask import render_template

from . import app


@app.route('/')
@app.route('/<lang_code>/')
def index():
    return render_template("index.html")
