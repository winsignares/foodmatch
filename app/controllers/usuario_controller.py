from flask import Blueprint, request, jsonify
from app.services.usuario_service import UsuarioService

usuario_bp = Blueprint('usuario_bp', __name__, url_prefix='/api/usuarios')

@usuario_bp.route('/', methods=['POST'])
def registrar_usuario():
    try:
        data = request.get_json()
        usuario_service = UsuarioService()
        usuario_service.registrar_usuario(data)
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@usuario_bp.route('/iniciar-sesion', methods=['POST'])
def iniciar_sesion():
    try:
        data = request.get_json()
        usuario_service = UsuarioService()
        usuario = usuario_service.iniciar_sesion(data)
        return jsonify(usuario), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@usuario_bp.route('/<int:id>', methods=['GET'])
def obtener_usuario_por_id(id):
    try:
        usuario_service = UsuarioService()
        usuario = usuario_service.obtener_usuario_por_id(id)
        return jsonify(usuario), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@usuario_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        usuario_service = UsuarioService()
        usuario_service.eliminar_usuario(id)
        return jsonify({"message": "Usuario eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@usuario_bp.route('/<int:id>', methods=['PUT'])
def actualizar_usuario(id, data):
    try:
        usuario_service = UsuarioService()
        usuario_service.actualizar_usuario(id, data)
        return jsonify({"message": "Usuario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400