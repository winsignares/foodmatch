from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

user = "root"
password = "password"
nombrecontainer = "mysql_container"
namedb = "SIFoodMatch"

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{user}:{password}@{nombrecontainer}/{namedb}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "ingweb"

db = SQLAlchemy(app)
ma = Marshmallow(app)