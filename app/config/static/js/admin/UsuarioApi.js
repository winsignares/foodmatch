async function cargarUsuariosEnTabla() {
    try {
        const response = await axios.get('/api/usuarios');
        const usuarios = response.data;

        const tabla = $('#usuariosTable');

        // Si ya está inicializada, destruirla antes de modificar el DOM
        if ($.fn.DataTable.isDataTable(tabla)) {
            tabla.DataTable().clear().destroy();
        }

        const tbody = tabla.find('tbody');
        tbody.empty(); // Limpiar contenido previo

        usuarios.forEach(usuario => {
            const fila = `
                <tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.username}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tbody.append(fila);
        });

        // Inicializar DataTable
        tabla.DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            responsive: true,
            pageLength: 10,
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
                 '<"row"<"col-sm-12"tr>>' +
                 '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>'
        });

    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarUsuariosEnTabla);

async function eliminarUsuario(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
        return;
    }

    try {
        await axios.delete(`/api/usuarios/${id}`);
        await Swal.fire({
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Recargar tabla luego de eliminación
        await cargarUsuariosEnTabla();

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        await Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el usuario. Por favor, inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}
