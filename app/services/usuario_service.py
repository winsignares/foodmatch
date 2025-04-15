from app.repository.usuario_repository import UsuarioRepository

class UsuarioService:
    def __init__(self):
        self.usuario_repository = UsuarioRepository()

    def registrar_usuario(self, data):
        data
        self.usuario_repository.crear_usuario(data)