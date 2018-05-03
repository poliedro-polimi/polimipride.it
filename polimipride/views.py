from flask import render_template
from flask_babel import gettext as _

from . import app


def _get_numeral(number):
    if number == 1:
        return _("st")
    elif number == 2:
        return _("nd")
    elif number == 3:
        return _("rd")
    return _("th")


def localtime(h, m):
    if _("en") == "it":
        return "{}:{:02d}".format(h, m)

    ampm = _("am")

    if h >= 12:
        ampm = _("pm")
    if h == 0:
        h = 12
    if h > 12:
        h -= 12

    return "{}:{:02d}{}".format(h, m, ampm)


@app.route('/')
@app.route('/<lang_code>/')
def index():
    # Calendar card order:
    # - w = day of week
    # - d = day of month
    # - m = month
    # - l = location + time
    # - t = title
    # - b = button
    return render_template("index.html", calendar_card_order=_("wmdltb"), numeral=_get_numeral, localtime=localtime)
