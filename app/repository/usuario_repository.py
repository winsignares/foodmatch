from app.config.db import db

class UsuarioRepository:
    def crear_usuario(self, usuario):
        db.session.add(usuario)
        db.session.commit()