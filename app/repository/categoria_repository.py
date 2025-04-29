from app.config.db import db
from app.models.categoria_entity import Categoria

class CategoriaRepository:

    def crear_categoria(self, categoria):
        db.session.add(categoria)
        db.session.commit()

    def eliminar_categoria(self, id):
        categoria = Categoria.query.get(id)
        if not categoria:
            raise ValueError("Categoria no encontrada")
        db.session.delete(categoria)
        db.session.commit()

    def obtener_categorias(self):
        return Categoria.query.all()

    def actualizar_categoria(self,id, categoria_nueva):
        categoria_existente = Categoria.query.get(id)

        if not categoria_existente:
            raise ValueError("Categoria no encontrada")

        categoria_existente.nombre = categoria_nueva.nombre
        categoria_existente.descripcion = categoria_nueva.descripcion
        db.session.commit()

