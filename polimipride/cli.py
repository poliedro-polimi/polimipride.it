import click

from . import app, freezer


@app.cli.command()
@click.option('--dest', '-d', type=str, default=None)
def freeze(dest):
    """Generate static website."""
    if dest:
        app.config["FREEZER_DESTINATION"] = dest
    freezer.freeze()
