from app.config.db import db
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, descripcion):
        self.nombre = nombre
        self.descripcion = descripcion

class CategoriaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Categoria
        load_instance = True