from flask import Blueprint, render_template

admin_routes = Blueprint('admin_routes', __name__, url_prefix='/admin')

@admin_routes.route('/panel', methods=['GET'])
def usuarios():
    return render_template('admin/AdminPage.html')

@admin_routes.route('/recetas', methods=['GET'])
def recetas():
    return render_template('admin/GestionRecetas.html')

@admin_routes.route('/ingredientes', methods=['GET'])
def ingredientes():
    return render_template('admin/GestionIngredientes.html')

@admin_routes.route('/categorias', methods=['GET'])
def categorias():
    return render_template('admin/GestionCategorias.html')

@admin_routes.route('/aprobar-recetas', methods=['GET'])
def aprobar_recetas():
    return render_template('admin/AprobacionRecetas.html')


@admin_routes.route('/ingredientes/agregar', methods=['GET'])
def agregar_ingredientes():
    return render_template('agregar_ingredientes.html')

@admin_routes.route('/ingredientes/editar/<int:id>', methods=['GET'])
def editar_ingredientes():
    return render_template('editar_ingredientes.html')




@admin_routes.route('/recetas/agregar', methods=['GET'])
def agregar_recetas():
    return render_template('agregar_recetas.html')

@admin_routes.route('/recetas/editar/<int:id>', methods=['GET'])
def editar_recetas():
    return render_template('editar_recetas.html')

@admin_routes.route('/recetas/detalles/<int:id>', methods=['GET'])
def detalles_receta():
    return render_template('detalles_receta.html')

@admin_routes.route('/categorias/agregar', methods=['GET'])
def agregar_categorias():
    return render_template('agregar_categorias.html')

@admin_routes.route('/categorias/editar/<int:id>', methods=['GET'])
def editar_categorias():
    return render_template('editar_categorias.html')



