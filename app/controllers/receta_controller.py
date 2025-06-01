
import json

from flask import Blueprint, request, jsonify

from app.services.receta_service import RecetaService

receta_bp = Blueprint('receta_bp', __name__, url_prefix='/api/recetas')

@receta_bp.route('/', methods=['POST'])
def crear_receta():
    try:
        data = request.form.get('data')
        data = json.loads(data)
        pasos = request.form.get('pasos')
        pasos = json.loads(pasos)
        foto = request.files.get('foto')
        receta_service = RecetaService()
        receta_service.crear_receta(data, foto, pasos)
        return jsonify(mensaje="Receta creada exitosamente"), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/', methods=['GET'])
def obtener_recetas():
    try:
        receta_service = RecetaService()
        recetas = receta_service.obtener_recetas()
        return jsonify(recetas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/<int:id>', methods=['GET'])
def obtener_receta_por_id(id):
    try:
        receta_service = RecetaService()
        receta = receta_service.obtener_receta_por_id(id)
        return jsonify(receta), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_receta(id):
    try:
        receta_service = RecetaService()
        receta_service.eliminar_receta(id)
        return jsonify(mensaje="Receta eliminada exitosamente"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/<int:id>', methods=['PUT'])
def editar_receta(id):
    try:
        receta_service = RecetaService()
        data = request.get_json()
        receta_service.editar_receta(id, data)
        return jsonify(mensaje="Receta editada exitosamente"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/favoritos/', methods=['POST'])
def guardar_receta_en_favoritos():
    try:
        data = request.get_json()
        receta_service = RecetaService()
        receta_service.guardar_receta_en_favoritos(data)
        return jsonify(mensaje="Receta guardada en favoritos"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/favoritos/', methods=['DELETE'])
def eliminar_receta_en_favoritos():
    try:
        data = request.get_json()
        receta_service = RecetaService()
        receta_service.eliminar_receta_en_favoritos(data)
        return jsonify(mensaje="Receta eliminada de favoritos"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/favoritos/<int:id_usuario>', methods=['GET'])
def obtener_recetas_por_usuario(id_usuario):
    try:
        receta_service = RecetaService()
        recetas = receta_service.obtener_recetas_por_usuario(id_usuario)
        return jsonify(recetas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/aprobar/', methods=['PUT'])
def aprobar_receta():
    try:
        data = request.get_json()
        receta_service = RecetaService()
        receta_service.aprobar_receta(data)
        return jsonify(mensaje="Receta aprobada exitosamente"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/aprobar/', methods=['GET'])
def obtener_recetas_no_aprobadas():
    try:
        receta_service = RecetaService()
        recetas = receta_service.obtener_recetas_no_aprobadas()
        return jsonify(recetas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/cambiar_foto_receta/<int:id_receta>', methods=['PUT'])
def cambiar_foto_receta(id_receta):
    try:
        receta_service = RecetaService()
        foto = request.files.get('foto')
        receta_service.cambiar_foto_receta(id_receta, foto)
        return jsonify(mensaje="Foto de receta cambiada exitosamente"), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/recomendar/',  methods=['POST'])
def recomendar_recetas():
    try:
        data = request.get_json()
        receta_service = RecetaService()
        recetas_recomendadas = receta_service.recomendar_recetas(data)
        return jsonify(recetas_recomendadas), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@receta_bp.route('/categorias_ingredientes/', methods=['GET'])
def retornar_categorias_ingredientes():
    try:
        receta_service = RecetaService()
        categorias_ingredientes = receta_service.retornar_categorias_ingredientes()
        return jsonify(categorias_ingredientes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400