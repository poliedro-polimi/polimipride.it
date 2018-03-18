from . import app, freezer

@app.cli.command()
def freeze():
    """Generate static website."""
    freezer.freeze()