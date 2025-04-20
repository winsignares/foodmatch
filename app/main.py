from app.config.db import create_app, db
from app.controllers.usuario_controller import usuario_bp

app = create_app()

app.register_blueprint(usuario_bp)

@app.route("/")
def index():
    return "Holaaa"

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")