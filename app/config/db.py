from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    app = Flask(__name__,template_folder='templates',static_folder='static')

    user = "root"
    password = "root"
    nombrecontainer = "mysql_container"
    namedb = "foodmatch"

    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{nombrecontainer}/{namedb}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['STATIC_FOLDER'] = app.static_folder
    app.secret_key = "ingweb"


    db.init_app(app)
    ma.init_app(app)

    with app.app_context():

        from app.models.usuario_entity import Usuario, Rol
        from app.models.ingrediente_entity import Ingrediente, Origen
        from app.models.recetas_entity import Receta
        from app.models.categoria_entity import Categoria

        db.create_all()

        if not Rol.query.first():
            rol_admin = Rol(rol="Admin", descripcion="Administrador del sistema")
            rol_usuario = Rol(rol="Usuario", descripcion="Usuario estándar")
            db.session.add_all([rol_admin, rol_usuario])
            db.session.commit()

        if not Origen.query.first():
            origen1 = Origen(nombre="Animal", descripcion="Origen animal")
            origen2 = Origen(nombre="Vegetal", descripcion="Origen vegetal")
            origen3 = Origen(nombre="Mineral", descripcion="Origen mineral")
            db.session.add_all([origen1, origen2, origen3])
            db.session.commit()

    return app
