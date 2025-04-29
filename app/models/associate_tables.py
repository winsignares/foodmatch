from app.config.db import db

usuario_ingrediente = db.Table(
    'usuario_ingrediente',
    db.Column('usuario_id', db.Integer, db.ForeignKey('usuarios.id'), primary_key=True),
    db.Column('ingrediente_id', db.Integer, db.ForeignKey('ingredientes.id'), primary_key=True)
)   

receta_ingrediente = db.Table(
    'receta_ingrediente',
    db.Column('receta_id', db.Integer, db.ForeignKey('recetas.id'), primary_key=True),
    db.Column('ingrediente_id', db.Integer, db.ForeignKey('ingredientes.id'), primary_key=True)
)

usuario_receta = db.Table(
    'usuario_receta',
    db.Column('usuario_id', db.Integer, db.ForeignKey('usuarios.id'), primary_key=True),
    db.Column('receta_id', db.Integer, db.ForeignKey('recetas.id'), primary_key=True)
)

receta_categoria = db.Table(
    'receta_categoria',
    db.Column('receta_id', db.Integer, db.ForeignKey('recetas.id'), primary_key=True),
    db.Column('categoria_id', db.Integer, db.ForeignKey('categorias.id'), primary_key=True)
)