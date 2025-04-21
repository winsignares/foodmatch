from app.config.db import create_app, db
from flask import render_template

app = create_app()

from app.controllers.usuario_controller import usuario_bp
from app.controllers.ingrediente_controller import ingrediente_bp

app.register_blueprint(usuario_bp)
app.register_blueprint(ingrediente_bp)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")