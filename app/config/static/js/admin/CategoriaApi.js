let tablaCategorias;
document.addEventListener("DOMContentLoaded", function () {
    // Inicializar DataTable una sola vez
    tablaCategorias = $('#CategoriasTable').DataTable({
        columns: [
            { data: 'nombre', title: 'Nombre' },
            { data: 'descripcion', title: 'Descripción' },
            {
                data: null,
                title: 'Acciones',
                orderable: false,
                searchable: false,
                className: 'text-end',
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-sm btn-primary" onclick="editarCategoria(${row.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${row.id})">
                            Eliminar
                        </button>
                    `;
                }
            }
        ]
    });

    // Cargar categorías al iniciar
    obtenerCategorias();
});
function obtenerCategorias(){
    axios.get('/api/categorias')
        .then(response => {
            tablaCategorias.clear().rows.add(response.data).draw();
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
            Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
        });
}

function agregarCategoria(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const nombre = document.getElementById('nombreCategoria').value;
    const descripcion = document.getElementById('descripcionCategoria').value;

    const nuevaCategoria = {
        nombre: nombre,
        descripcion: descripcion
    };

    axios.post('/api/categorias', nuevaCategoria)
        .then(response => {
            Swal.fire('Éxito', 'La categoría ha sido agregada correctamente', 'success');
            $('#modalAgregarCategoria').modal('hide'); // Cerrar el modal
            obtenerCategorias(); // Recargar la tabla
        })
        .catch(error => {
            console.error('Error al agregar categoría:', error);
            Swal.fire('Error', 'No se pudo agregar la categoría', 'error');
        });
}

function eliminarCategoria(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la categoría de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/categorias/${id}`)
                .then(response => {
                    Swal.fire('Eliminado', 'La categoría ha sido eliminada correctamente.', 'success');
                    obtenerCategorias(); // Recargar la tabla
                })
                .catch(error => {
                    console.error('Error al eliminar categoría:', error);
                    Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
                });
        }
    });
}
function editarCategoria(id) {
    axios.get(`/api/categorias/${id}`)
        .then(response => {
            const categoria = response.data;
            document.getElementById('editarIdCategoria').value = categoria.id;
            document.getElementById('editarNombreCategoria').value = categoria.nombre;
            document.getElementById('editarDescripcionCategoria').value = categoria.descripcion;

            $('#modalEditarCategoria').modal('show'); // Abrir el modal
        })
        .catch(error => {
            console.error('Error al obtener la categoría:', error);
            Swal.fire('Error', 'No se pudo cargar la categoría para editar.', 'error');
        });
}
function actualizarCategoria(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const id = document.getElementById('editarIdCategoria').value;
    const nombre = document.getElementById('editarNombreCategoria').value;
    const descripcion = document.getElementById('editarDescripcionCategoria').value;

    const categoriaActualizada = {
        nombre: nombre,
        descripcion: descripcion
    };

    axios.put(`/api/categorias/${id}`, categoriaActualizada)
        .then(response => {
            Swal.fire('Éxito', 'La categoría ha sido actualizada correctamente', 'success');
            $('#modalEditarCategoria').modal('hide'); // Cerrar el modal
            obtenerCategorias(); // Recargar la tabla
        })
        .catch(error => {
            console.error('Error al actualizar la categoría:', error);
            Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
        });
}