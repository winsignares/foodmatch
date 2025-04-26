from flask import Blueprint, request, jsonify
from app.services.categoria_service import CategoriaService

categoria_bp = Blueprint('categoria_bp', __name__, url_prefix='/api/categorias')

@categoria_bp.route('/', methods=['POST'])
def registrar_categoria():
    try:
        data = request.get_json()
        categoria_service = CategoriaService()
        categoria_service.crear_categoria(data)
        return jsonify({"message": "Categoria registrada exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@categoria_bp.route('/', methods=['GET'])
def obtener_categorias():
    try:
        categoria_service = CategoriaService()
        categorias = categoria_service.obtener_categorias()
        return jsonify(categorias), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@categoria_bp.route('/<int:id>', methods=['PUT'])
def actualizar_categoria(id):
    try:
        data = request.get_json()
        categoria_service = CategoriaService()
        categoria_service.actualizar_categoria(id, data)
        return jsonify({"message": "Categoria actualizada exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@categoria_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_categoria(id):
    try:
        categoria_service = CategoriaService()
        categoria_service.eliminar_categoria(id)
        return jsonify({"message": "Categoria eliminada exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400