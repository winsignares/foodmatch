from flask import Blueprint, render_template

usuario_route = Blueprint('usuario_route', __name__)

@usuario_route.route('/registro', methods=['GET'])
def register():
    return render_template('usuario/Register.html')

@usuario_route.route('/login', methods=['GET'])
def login():
    return render_template('usuario/login.html')

@usuario_route.route('/panel', methods=['GET'])
def user_page():
    return render_template('usuario/userPage.html')

@usuario_route.route('/recetas', methods=['GET'])
def proponer_receta():
    return render_template('proponer_receta.html')

@usuario_route.route('/recetas_favoritas', methods=['GET'])
def recetas_favoritas():
    return render_template('recetas_favoritas.html')

@usuario_route.route('/recetas/buscar', methods=['GET'])
def buscar_receta():
    return render_template('buscar_receta.html')

@usuario_route.route('/recetas/ver', methods=['GET'])
def ver_receta():
    return render_template('ver_receta.html')

@usuario_route.route('/recetas/editar/<int:id>', methods=['GET'])
def mi_perfil():
    return render_template('mi_perfil.html')

@usuario_route.route('/log-out', methods=['GET'])
def cerrar_sesion():
    return render_template('index.html')