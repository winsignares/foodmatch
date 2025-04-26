from app.config.db import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.ingrediente_entity import Ingrediente
from app.models.associate_tables import receta_ingrediente, receta_categoria
from app.models.categoria_entity import Categoria

class Receta(db.Model):
    __tablename__ = 'recetas'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    pasos = db.Column(db.Text, nullable=False)
    es_vegano = db.Column(db.Boolean, nullable=False)
    es_vegetariano = db.Column(db.Boolean, nullable=False)
    foto = db.Column(db.String(255), nullable=False)
    ingredientes = db.relationship(Ingrediente, secondary=receta_ingrediente, backref=db.backref('recetas', lazy='dynamic'))
    categorias = db.relationship(Categoria, secondary=receta_categoria, backref=db.backref('recetas', lazy='dynamic'))

    def __init__(self, nombre, pasos, es_vegano, es_vegetariano, foto):
        self.nombre = nombre
        self.pasos = pasos
        self.es_vegano = es_vegano
        self.es_vegetariano = es_vegetariano
        self.foto = foto

class RecetaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Receta
        load_instance = True