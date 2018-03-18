import click

from . import app, freezer


@app.cli.command()
@click.option('--dest', '-d', type=str, default=None, help="Path where frozen site will be placed.")
def freeze(dest):
    """Generate static website."""
    if dest:
        app.config["FREEZER_DESTINATION"] = dest
    freezer.freeze()
