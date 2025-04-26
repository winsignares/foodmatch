from app.models.categoria_entity import Categoria, CategoriaSchema
from app.repository.categoria_repository import CategoriaRepository

class CategoriaService:

    categoria_schema = CategoriaSchema()
    categorias_schema = CategoriaSchema(many=True)

    def __init__(self):
        self.categoria_repository = CategoriaRepository()

    def crear_categoria(self, data):
        nueva_categoria = Categoria(
            nombre=data['nombre'],
            descripcion=data['descripcion']
        )
        self.categoria_repository.crear_categoria(nueva_categoria)

    def obtener_categorias(self):
        resultado_consulta = self.categoria_repository.obtener_categorias()
        categorias = self.categorias_schema.dump(resultado_consulta)
        return categorias

    def actualizar_categoria(self,id, data):
        categoria_nueva = Categoria(
            nombre=data['nombre'],
            descripcion=data['descripcion']
        )
        self.categoria_repository.actualizar_categoria(id,categoria_nueva)

    def eliminar_categoria(self, id):
        self.categoria_repository.eliminar_categoria(id)
