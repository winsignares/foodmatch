from app.config.db import db
from app.models.ingrediente_entity import Ingrediente, Origen, OrigenSchema, IngredienteSchema

class IngredienteRepository:

    def crear_ingrediente(self, ingrediente):
        db.session.add(ingrediente)
        db.session.commit()

    def obtener_ingredientes(self):
        return Ingrediente.query.all()

    def obtener_ingrediente_por_id(self, id):
        return Ingrediente.query.get(id)

    def actualizar_ingrediente(self, id,ingrediente_nuevo):
        ingrediente_existente = Ingrediente.query.get(id)
        if ingrediente_existente:
            ingrediente_existente.nombre = ingrediente_nuevo.nombre
            ingrediente_existente.id_origen = ingrediente_nuevo.id_origen
            db.session.commit()
        else:
            raise ValueError("Ingrediente no encontrado")

    def eliminar_ingrediente(self, id):
        ingrediente_existente = Ingrediente.query.get(id)
        if ingrediente_existente:
            db.session.delete(ingrediente_existente)
            db.session.commit()
        else:
            raise ValueError("Ingrediente no encontrado")