from app.config.db import db
from app.models.usuario_entity import Usuario


class UsuarioRepository:
    def crear_usuario(self, usuario):
        db.session.add(usuario)
        db.session.commit()

    def obtener_usuario_por_id(self, id):
        usuario = Usuario.query.get(id)
        if not usuario:
            raise ValueError("Usuario no encontrado")
        return Usuario.query.get(id)

    def obtener_usuario_por_username(self, username):
        usuario = Usuario.query.filter_by(username=username).first()
        if not usuario:
            raise ValueError("Usuario no encontrado")
        return Usuario.query.filter_by(username=username).first()

    def eliminar_usuario(self, id):
        usuario_existente = Usuario.query.get(id)
        if not usuario_existente:
            raise ValueError("Usuario no encontrado")

        db.session.delete(usuario_existente)
        db.session.commit()

    def actualizar_usuario(self, id, usuario_nuevo):
        usuario_existente = Usuario.query.get(id)

        if not usuario_existente:
            raise ValueError("Usuario no encontrado")

        usuario_existente.nombre = usuario_nuevo.nombre
        usuario_existente.apellido = usuario_nuevo.apellido
        usuario_existente.edad = usuario_nuevo.edad
        usuario_existente.telefono = usuario_nuevo.telefono
        usuario_existente.email = usuario_nuevo.email
        usuario_existente.username = usuario_nuevo.username
        db.session.commit()