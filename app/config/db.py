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
    app.secret_key = "ingweb"

    db.init_app(app)
    ma.init_app(app)

    return app
