from flask import Blueprint, request, jsonify
from app.services.ingrediente_service import IngredienteService

ingrediente_bp = Blueprint('ingrediente_bp', __name__,url_prefix='/api/ingredientes')

@ingrediente_bp.route('/', methods=['POST'])
def registrar_ingrediente():
    try:
        data = request.get_json()
        ingrediente_service = IngredienteService()
        ingrediente_service.crear_ingrediente(data)
        return jsonify({"message": "Ingrediente registrado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/', methods=['GET'])
def obtener_ingredientes():
    try:
        ingrediente_service = IngredienteService()
        ingredientes = ingrediente_service.obtener_ingredientes()
        return jsonify(ingredientes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/<int:id>', methods=['GET'])
def obtener_ingrediente_por_id(id):
    try:
        ingrediente_service = IngredienteService()
        ingrediente = ingrediente_service.obtener_ingrediente_por_id(id)
        return jsonify(ingrediente), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/<int:id>', methods=['PUT'])
def actualizar_ingrediente(id):
    try:
        data = request.get_json()
        ingrediente_service = IngredienteService()
        ingrediente_service.actualizar_ingrediente(id,data)
        return jsonify({"message": "Ingrediente actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_ingrediente(id):
    try:
        ingrediente_service = IngredienteService()
        ingrediente_service.eliminar_ingrediente(id)
        return jsonify({"message": "Ingrediente eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/usuario/<int:id_usuario>', methods=['GET'])
def obtener_ingredientes_por_usuario(id_usuario):
    try:
        ingrediente_service = IngredienteService()
        ingredientes = ingrediente_service.obtener_ingredientes_por_usuario(id_usuario)
        return jsonify(ingredientes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/favoritos/', methods=['POST'])
def guardar_ingrediente_en_favoritos():
    try:
        data = request.get_json()
        ingrediente_service = IngredienteService()
        ingrediente_service.guardar_ingrediente_en_favoritos(data)
        return jsonify({"message": "Ingrediente guardado en favoritos exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@ingrediente_bp.route('/favoritos/', methods=['DELETE'])
def eliminar_ingrediente_en_favoritos():
    try:
        data = request.get_json()
        ingrediente_service = IngredienteService()
        ingrediente_service.eliminar_ingrediente_en_favoritos(data)
        return jsonify({"message": "Ingrediente eliminado de favoritos exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400