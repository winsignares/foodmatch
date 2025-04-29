import os

from app.models.recetas_entity import Receta, RecetaSchema
from app.repository.receta_repository import RecetaRepository

from app.models.ingrediente_entity import Ingrediente
from app.models.categoria_entity import Categoria
from app.utils.file_manager import FileManager
from app.utils.graph_manager import GraphManager


class RecetaService:

    receta_schema = RecetaSchema()
    recetas_schema = RecetaSchema(many=True)
    def __init__(self):
        from app.main import app
        self.receta_repository = RecetaRepository()
        self.file_manager = FileManager(
            upload_folder=os.path.join(app.config["STATIC_FOLDER"], "uploads", "recetas")
        )

    def crear_receta(self, data, foto):

        ingredientes = Ingrediente.query.filter(Ingrediente.id.in_(data['ingredientes'])).all()
        categorias = Categoria.query.filter(Categoria.id.in_(data['categorias'])).all()
        nueva_receta = Receta(
            nombre=data['nombre'],
            pasos=data['pasos'],
            es_vegano=data['es_vegano'],
            es_vegetariano=data['es_vegetariano'],
            ingredientes=ingredientes,
            categorias=categorias,
            esta_aprobada=data['esta_aprobada'],
            foto=self.file_manager.upload_file(foto)
        )

        self.receta_repository.agregar_receta(nueva_receta)

    def obtener_recetas(self):
        recetas = self.receta_repository.obtener_recetas()
        return self.recetas_schema.dump(recetas)

    def obtener_receta_por_id(self, id):
        receta = self.receta_repository.obtener_receta_por_id(id)
        return self.receta_schema.dump(receta)

    def eliminar_receta(self, id):
        receta = self.receta_repository.obtener_receta_por_id(id)
        if receta.foto:
            self.file_manager.delete_file(receta.foto)
        self.receta_repository.eliminar_receta(id)

    def editar_receta(self, id, data):
        receta = self.receta_repository.obtener_receta_por_id(id)
        receta.nombre = data['nombre']
        receta.pasos = data['pasos']
        receta.es_vegano = data['es_vegano']
        receta.es_vegetariano = data['es_vegetariano']
        receta.esta_aprobada = data['esta_aprobada']
        receta.ingredientes = Ingrediente.query.filter(Ingrediente.id.in_(data['ingredientes'])).all()
        receta.categorias = Categoria.query.filter(Categoria.id.in_(data['categorias'])).all()

        self.receta_repository.agregar_receta(receta)

    def guardar_receta_en_favoritos(self, data):
        id_usuario = data['id_usuario']
        id_receta = data['id_receta']
        self.receta_repository.guardar_receta_en_favoritos(id_receta, id_usuario)

    def eliminar_receta_en_favoritos(self, data):
        id_usuario = data['id_usuario']
        id_receta = data['id_receta']
        self.receta_repository.eliminar_receta_en_favoritos(id_receta, id_usuario)

    def obtener_recetas_por_usuario(self, id_usuario):
        return self.recetas_schema.dump(self.receta_repository.obtener_recetas_por_usuario(id_usuario))

    def aprobar_receta(self, data):
        id = data['id']
        decision = data['decision']
        if not decision:
            self.receta_repository.eliminar_receta(id)
        else:
            self.receta_repository.aprobar_receta(id)

    def obtener_recetas_no_aprobadas(self):
        return self.recetas_schema.dump(self.receta_repository.obtener_recetas_no_aprobadas())

    def cambiar_foto_receta(self, id_receta, foto):
        receta = self.receta_repository.obtener_receta_por_id(id_receta)
        if receta.foto:
            self.file_manager.delete_file(receta.foto)
        receta.foto = self.file_manager.upload_file(foto)
        self.receta_repository.agregar_receta(receta)

    def recomendar_recetas(self, data):

        id_ingredientes = data['ingredientes']
        id_categorias = data['categorias']
        recetas = self.recetas_schema.dump(self.receta_repository.obtener_recetas())

        graph_manager = GraphManager()

        return graph_manager.recomendar_receta(recetas, id_ingredientes, id_categorias)

