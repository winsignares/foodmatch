from app.models.recetas_entity import Receta, RecetaSchema
from app.config.db import db
from app.models.usuario_entity import Usuario


class RecetaRepository:

    def agregar_receta(self, receta):
        db.session.add(receta)
        db.session.commit()

    def obtener_recetas(self):
        return Receta.query.filter_by(esta_aprobada=True).all()

    def obtener_receta_por_id(self, id):
        receta = Receta.query.get(id)
        if not receta:
            raise ValueError("Receta no encontrada")
        return receta

    def eliminar_receta(self, id):
        receta = Receta.query.get(id)
        if not receta:
            raise ValueError("Receta no encontrada")
        db.session.delete(receta)
        db.session.commit()

    def guardar_receta_en_favoritos(self, id_receta, id_usuario):
        usuario = Usuario.query.get(id_usuario)
        receta = Receta.query.get(id_receta)

        if not receta:
            raise ValueError("Receta no encontrada")

        usuario.recetas.append(receta)
        db.session.commit()

    def eliminar_receta_en_favoritos(self, id_receta, id_usuario):
        usuario = Usuario.query.get(id_usuario)
        receta = Receta.query.get(id_receta)

        if not receta:
            raise ValueError("Receta no encontrada")

        usuario.recetas.remove(receta)
        db.session.commit()

    def obtener_recetas_por_usuario(self, id_usuario):
        usuario = Usuario.query.get(id_usuario)
        if not usuario:
            raise ValueError("Usuario no encontrado")
        return usuario.recetas

    def aprobar_receta(self, id):
        receta = Receta.query.get(id)
        receta.esta_aprobada = True
        db.session.commit()

    def obtener_recetas_no_aprobadas(self):
         return Receta.query.filter_by(esta_aprobada=False).all()