from app.models.usuario_entity import Usuario
from app.repository.usuario_repository import UsuarioRepository
import bcrypt

class UsuarioService:
    def __init__(self):
        self.usuario_repository = UsuarioRepository()

    def registrar_usuario(self, data):
        salt = bcrypt.gensalt()
        nuevo_usuario = Usuario(
            nombre=data['nombre'],
            apellido=data['apellido'],
            edad=data['edad'],
            telefono=data['telefono'],
            email=data['email'],
            username=data['username'],
            contrasenia=bcrypt.hashpw(data['contrasenia'].encode('utf-8'), salt),
            id_rol=data['id_rol']
        )
        self.usuario_repository.crear_usuario(nuevo_usuario)