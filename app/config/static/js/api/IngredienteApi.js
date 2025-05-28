let tablaIngredientes;

document.addEventListener("DOMContentLoaded", function () {
    // Inicializar DataTable una sola vez
    tablaIngredientes = $('#ingredientesTable').DataTable({
        columns: [
            { data: 'nombre', title: 'Nombre' },
            { data: 'origen_nombre', title: 'Origen' },
            {
                data: null,
                title: 'Acciones',
                orderable: false,
                searchable: false,
                className: 'text-end',
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-sm btn-primary" onclick="editarIngrediente(${row.id})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarIngrediente(${row.id})">
                        Eliminar
                        </button>
                    `;
                }
            }
        ]
    });

    // Cargar ingredientes al iniciar
    obtenerIngredientes();
});

function obtenerIngredientes() {
    axios.get('/api/ingredientes')
        .then(response => {
            tablaIngredientes.clear().rows.add(response.data).draw();
        })
        .catch(error => {
            console.error('Error al obtener ingredientes:', error);
            Swal.fire('Error', 'No se pudieron cargar los ingredientes', 'error');
        });
}

function agregarIngrediente(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();

    const nombre = document.getElementById('nombreIngrediente').value;
    const origen = document.getElementById('origenIngrediente').value;

    if (!nombre || !origen) {
        Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
        return;
    }

    axios.post('/api/ingredientes', { nombre, id_origen: parseInt(origen, 10) })
        .then(response => {
            Swal.fire('Éxito', 'Ingrediente agregado correctamente', 'success');
            obtenerIngredientes(); // Recargar la tabla
            $('#modalAgregarIngrediente').modal('hide'); // Cerrar el modal
        })
        .catch(error => {
            console.error('Error al agregar ingrediente:', error);
            Swal.fire('Error', 'No se pudo agregar el ingrediente', 'error');
        });
}

function editarIngrediente(id) {
    axios.get(`/api/ingredientes/${id}`)
        .then(response => {
            const ingrediente = response.data;
            document.getElementById('editarIdIngrediente').value = ingrediente.id;
            document.getElementById('editarNombreIngrediente').value = ingrediente.nombre;
            document.getElementById('editarOrigenIngrediente').value = ingrediente.id_origen;
            $('#modalEditarIngrediente').modal('show');
        })
        .catch(error => {
            console.error('Error al obtener ingrediente:', error);
            Swal.fire('Error', 'No se pudo cargar el ingrediente para editar', 'error');
        });
}

function actualizarIngrediente(event) {
    event.preventDefault();

    const id = document.getElementById('editarIdIngrediente').value;
    const nombre = document.getElementById('editarNombreIngrediente').value;
    const origen = document.getElementById('editarOrigenIngrediente').value;

    if (!nombre || !origen) {
        Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
        return;
    }

    axios.put(`/api/ingredientes/${id}`, { nombre, id_origen: parseInt(origen, 10) })
        .then(response => {
            Swal.fire('Éxito', 'Ingrediente actualizado correctamente', 'success');
            obtenerIngredientes(); // Recargar la tabla
            $('#modalEditarIngrediente').modal('hide'); // Cerrar el modal
        })
        .catch(error => {
            console.error('Error al actualizar ingrediente:', error);
            Swal.fire('Error', 'No se pudo actualizar el ingrediente', 'error');
        });
}
function eliminarIngrediente(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/ingredientes/${id}`)
                .then(response => {
                    Swal.fire('Eliminado', 'El ingrediente ha sido eliminado correctamente', 'success');
                    obtenerIngredientes(); // Recargar la tabla
                })
                .catch(error => {
                    console.error('Error al eliminar ingrediente:', error);
                    Swal.fire('Error', 'No se pudo eliminar el ingrediente', 'error');
                });
        }
    });
}