from app.models.usuario_entity import Usuario, UsuarioSchema
from app.repository.usuario_repository import UsuarioRepository
import bcrypt

class UsuarioService:

    usuario_schema = UsuarioSchema()
    usuarios_schema = UsuarioSchema(many=True)

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

    def iniciar_sesion(self, data):
        usuario = self.usuario_repository.obtener_usuario_por_username(data['username'])
        if not usuario:
            raise ValueError("Usuario no encontrado")

        if bcrypt.checkpw(data['contrasenia'].encode('utf-8'), usuario.contrasenia.encode('utf-8')):
            return self.usuario_schema.dump(usuario)
        else:
            raise ValueError("Contraseña incorrecta")

    def obtener_usuario_por_id(self, id):
        resultado_consulta = self.usuario_repository.obtener_usuario_por_id(id)

        return self.usuario_schema.dump(resultado_consulta)

    def eliminar_usuario(self, id):
        self.usuario_repository.eliminar_usuario(id)

    def actualizar_usuario(self, id, data):
        self.actualizar_usuario(id, data)

    def obtener_lista_usuarios(self):
        resultado_consulta = self.usuario_repository.obtener_lista_usuarios()
        return self.usuarios_schema.dump(resultado_consulta)