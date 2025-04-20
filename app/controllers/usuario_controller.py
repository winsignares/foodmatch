from flask import Blueprint, request, jsonify
from app.services.usuario_service import UsuarioService

usuario_bp = Blueprint('usuario_bp', __name__, url_prefix='/usuarios')

@usuario_bp.route('/', methods=['POST'])
def registrar_usuario():
    try:
        data = request.get_json()
        usuario_service = UsuarioService()
        usuario_service.registrar_usuario(data)
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

