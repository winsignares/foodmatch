from app.models.ingrediente_entity import Ingrediente, IngredienteSchema, OrigenSchema
from app.repository.ingrediente_repository import IngredienteRepository

class IngredienteService:
    ingrediente_schema = IngredienteSchema()
    ingredientes_schema = IngredienteSchema(many=True)

    origen_schema = OrigenSchema()
    origenes_schema = OrigenSchema(many=True)
    def __init__(self):
        self.ingrediente_repository = IngredienteRepository()

    def crear_ingrediente(self, data):
        nuevo_ingrediente = Ingrediente(
            nombre=data['nombre'],
            id_origen=data['id_origen']
        )
        self.ingrediente_repository.crear_ingrediente(nuevo_ingrediente)

    def obtener_ingredientes(self):
        resultado_consulta = self.ingrediente_repository.obtener_ingredientes()
        ingredientes = self.ingredientes_schema.dump(resultado_consulta)
        return ingredientes

    def obtener_ingrediente_por_id(self, id):
        resultado_consulta = self.ingrediente_repository.obtener_ingrediente_por_id(id)
        return self.ingrediente_schema.dump(resultado_consulta)

    def actualizar_ingrediente(self,id, data):
        ingrediente_nuevo = Ingrediente(
            nombre=data['nombre'],
            id_origen=data['id_origen']
        )
        self.ingrediente_repository.actualizar_ingrediente(id,ingrediente_nuevo)

    def eliminar_ingrediente(self, id):
        self.ingrediente_repository.eliminar_ingrediente(id)