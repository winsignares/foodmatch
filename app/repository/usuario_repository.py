from app.models.entity.usuario_entity import Usuario
from app.config.db import db

class UsuarioRepository:
    def crear_usuario(self, data):
        nuevo_usuario = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            edad=data['edad'],
            telefono=data['telefono'],
            email=data['email'],
            username=data['username'],
            contrasenia=data['contrasenia'],
            id_rol=data['id_rol']
        )
        db.session.add(nuevo_usuario)
        db.session.commit()