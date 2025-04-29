from app.config.db import db
from app.models.ingrediente_entity import Ingrediente, Origen, OrigenSchema, IngredienteSchema
from app.models.usuario_entity import Usuario


class IngredienteRepository:

    def crear_ingrediente(self, ingrediente):
        db.session.add(ingrediente)
        db.session.commit()

    def obtener_ingredientes(self):
        return Ingrediente.query.all()

    def obtener_ingrediente_por_id(self, id):
        ingrediente = Ingrediente.query.get(id)
        if not ingrediente:
            raise ValueError("Ingrediente no encontrado")
        return Ingrediente.query.get(id)



    def actualizar_ingrediente(self, id,ingrediente_nuevo):
        ingrediente_existente = Ingrediente.query.get(id)

        if not ingrediente_existente:
            raise ValueError("Ingrediente no encontrado")

        ingrediente_existente.nombre = ingrediente_nuevo.nombre
        ingrediente_existente.id_origen = ingrediente_nuevo.id_origen
        db.session.commit()

    def eliminar_ingrediente(self, id):
        ingrediente_existente = Ingrediente.query.get(id)
        if not ingrediente_existente:
            raise ValueError("Ingrediente no encontrado")

        db.session.delete(ingrediente_existente)
        db.session.commit()

    def obtener_ingredientes_por_usuario(self, id_usuario):
        usuario = Usuario.query.get(id_usuario)
        if not usuario:
            raise ValueError("Usuario no encontrado")
        return usuario.ingredientes

    def guardar_ingrediente_en_favoritos(self, id_ingrediente, id_usuario):
        ingrediente = Ingrediente.query.get(id_ingrediente)
        if not ingrediente:
            raise ValueError("Ingrediente no encontrado")

        usuario = Usuario.query.get(id_usuario)
        if not usuario:
            raise ValueError("Usuario no encontrado")

        usuario.ingredientes.append(ingrediente)
        db.session.commit()

    def eliminar_ingrediente_en_favoritos(self, id_usuario, id_ingrediente):
        usuario = Usuario.query.get(id_usuario)

        if not usuario:
            raise ValueError("Usuario no encontrado")

        ingrediente = Ingrediente.query.get(id_ingrediente)
        if not ingrediente:
            raise ValueError("Ingrediente no encontrado")

        if ingrediente not in usuario.ingredientes:
            raise ValueError("Ingrediente no encontrado")

        usuario.ingredientes.remove(ingrediente)
        db.session.commit()
