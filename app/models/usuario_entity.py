from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from app.config.db import db, ma

class Rol(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    rol = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)

    def __init__(self, rol, descripcion):
        self.rol = rol
        self.descripcion = descripcion



class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    apellido = db.Column(db.String(255), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    telefono = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    contrasenia = db.Column(db.String(255), nullable=False)
    id_rol = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    rol = db.relationship('Rol', backref=db.backref('usuarios', lazy=True))

    def __init__(self, nombre, apellido, edad, telefono, email, username, contrasenia, id_rol):
        self.nombre = nombre
        self.apellido = apellido
        self.edad = edad
        self.telefono = telefono
        self.email = email
        self.username = username
        self.contrasenia = contrasenia
        self.id_rol = id_rol


class RolSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Rol
        load_instance = True


class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        load_instance = True
        include_fk = True
        exclude = ('contrasenia',)