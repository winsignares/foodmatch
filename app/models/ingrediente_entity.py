# ingrediente_entity.py

from app.config.db import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


class Origen(db.Model):
    __tablename__ = 'origenes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False, unique=True)
    descripcion = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, descripcion):
        self.nombre = nombre
        self.descripcion = descripcion


class Ingrediente(db.Model):
    __tablename__ = 'ingredientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False, unique=True)
    id_origen = db.Column(db.Integer, db.ForeignKey('origenes.id'), nullable=False)

    origen = db.relationship('Origen', backref=db.backref('ingredientes', lazy=True))

    def __init__(self, nombre, id_origen):
        self.nombre = nombre
        self.id_origen = id_origen



class OrigenSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Origen
        load_instance = True


class IngredienteSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Ingrediente
        load_instance = True
        include_fk = True
