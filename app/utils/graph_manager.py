import networkx as nx

class GraphManager:
    def __init__(self):
        self.graph = nx.Graph()

    def construir_grafo(self, recetas):
        for receta in recetas:
            receta_id = f"receta_{receta['id']}"
            self.graph.add_node(receta_id, tipo='receta', data=receta)

            # Conectar ingredientes
            for ingrediente in receta['ingredientes']:
                ingrediente_id = f"ingrediente_{ingrediente['id']}"
                if not self.graph.has_node(ingrediente_id):
                    self.graph.add_node(ingrediente_id, tipo='ingrediente', nombre=ingrediente['nombre'])
                self.graph.add_edge(receta_id, ingrediente_id, weight=1)

            # Conectar categorías
            for categoria in receta['categorias']:
                categoria_id = f"categoria_{categoria['id']}"
                if not self.graph.has_node(categoria_id):
                    self.graph.add_node(categoria_id, tipo='categoria', nombre=categoria['nombre'])
                self.graph.add_edge(receta_id, categoria_id, weight=2)

    def recomendar_receta(self, recetas, id_ingredientes, id_categorias, min_match=0.7):
        self.graph.clear()  # Limpiar grafo antes
        self.construir_grafo(recetas)

        # Crear nodo especial del usuario
        self.graph.add_node("usuario", tipo="perfil")

        for ing_id in id_ingredientes:
            ingrediente_node = f"ingrediente_{ing_id}"
            if self.graph.has_node(ingrediente_node):
                self.graph.add_edge("usuario", ingrediente_node, weight=0.5)

        for cat_id in id_categorias:
            categoria_node = f"categoria_{cat_id}"
            if self.graph.has_node(categoria_node):
                self.graph.add_edge("usuario", categoria_node, weight=1)

        def heuristica(n1, n2):
            return 0

        recetas_nodos = [n for n, attr in self.graph.nodes(data=True) if attr['tipo'] == 'receta']

        recomendaciones = []

        for receta_node in recetas_nodos:
            receta_data = self.graph.nodes[receta_node]['data']

            ingredientes_receta = {ing['id'] for ing in receta_data['ingredientes']}
            categorias_receta = {cat['id'] for cat in receta_data['categorias']}

            total_ingredientes = len(ingredientes_receta)
            total_categorias = len(categorias_receta)

            # Calcular coincidencias
            ingredientes_encomun = ingredientes_receta.intersection(set(id_ingredientes))
            categorias_encomun = categorias_receta.intersection(set(id_categorias))

            total_encomun = len(ingredientes_encomun) + len(categorias_encomun)

            # Definir sobre qué evaluar
            total_referencia = 0
            if id_ingredientes and id_categorias:
                total_referencia = total_ingredientes + total_categorias
            elif id_ingredientes:
                total_referencia = total_ingredientes
            elif id_categorias:
                total_referencia = total_categorias
            else:
                total_referencia = total_ingredientes + total_categorias  # Si no enviaron nada

            if total_referencia == 0:
                continue  # Evitar división por cero

            porcentaje = total_encomun / total_referencia

            # Si no mandaron ni ingredientes ni categorías, aceptar todas las recetas
            if not id_ingredientes and not id_categorias:
                porcentaje = 1

            if porcentaje >= min_match:
                try:
                    path = nx.astar_path(self.graph, "usuario", receta_node, heuristic=heuristica, weight='weight')
                    costo = nx.path_weight(self.graph, path, weight='weight')
                    recomendaciones.append((receta_data, costo))
                except nx.NetworkXNoPath:
                    continue

        recomendaciones.sort(key=lambda x: x[1])

        return [receta for receta, _ in recomendaciones]
