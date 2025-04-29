from app.config.db import create_app
from flask import render_template

app = create_app()

#rest
from app.controllers.usuario_controller import usuario_bp
from app.controllers.ingrediente_controller import ingrediente_bp
from app.controllers.categoria_controller import categoria_bp
from app.controllers.receta_controller import receta_bp

app.register_blueprint(usuario_bp)
app.register_blueprint(ingrediente_bp)
app.register_blueprint(categoria_bp)
app.register_blueprint(receta_bp)

#rutas
from app.routes.usuario_routes import usuario_route
from app.routes.admin_routes import admin_routes

app.register_blueprint(usuario_route)
app.register_blueprint(admin_routes)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")