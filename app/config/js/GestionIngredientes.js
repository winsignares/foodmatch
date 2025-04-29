document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 768;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const body = document.body;

    if (isMobile) {
        sidebar.classList.remove('active');
        content.classList.remove('active');
    }

    document.getElementById('sidebarCollapse').addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        
        if (isMobile) {
            body.classList.toggle('sidebar-active', sidebar.classList.contains('active'));
        }
    });

    document.addEventListener('click', (e) => {
        if (isMobile &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !document.getElementById('sidebarCollapse').contains(e.target)) {
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-active');
        }
    });

    const ingredientes = [
        { id: 1, nombre: 'Tomate', origen: 'Animal' },
        { id: 2, nombre: 'Cilantro', origen: 'Animal' },
        { id: 3, nombre: 'Chile Habanero', origen: 'Animal' },
        { id: 4, nombre: 'Aguacate', origen: 'Animal' },
        { id: 5, nombre: 'Maíz', origen: 'Animal' },
        { id: 6, nombre: 'Epazote', origen: 'Animal' },
        { id: 7, nombre: 'Frijol Negro', origen: 'Animal' },
        { id: 8, nombre: 'Nopal', origen: 'Animal' }
    ];

    // Inicializar DataTable
    $('#ingredientesTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        data: ingredientes,
        columns: [
            {
                data: 'nombre',
                render: function (data, type, row) {
                    return `<span class="fw-medium">${data}</span>`;
                }
            },
            { data: 'origen' },
            {
                data: null,
                className: 'text-end',
                render: function (data) {
                    return `
                        <a href="AddIngrediente.html" class="btn btn-sm btn-primary" onclick="setEditData('${data.nombre}', '${data.origen}')">Editar</a>
                        <button class="btn btn-sm btn-danger" onclick="confirmDeleteIngredient('${data.nombre}')">Eliminar</button>
                    `;
                }
            }
        ],
        responsive: true,
        pageLength: 10,
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
             '<"row"<"col-sm-12"tr>>' +
             '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>'
    });

    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth < 768;
        if (currentIsMobile !== isMobile) {
            location.reload();
        }
    });
});

// Guardar datos para edición
function setEditData(nombre, origen) {
    localStorage.setItem('editNombre', nombre);
    localStorage.setItem('editOrigen', origen);
}

// Confirmar eliminación
function confirmDeleteIngredient(nombre) {
    if (confirm(`¿Estás seguro de que deseas eliminar el ingrediente "${nombre}"?`)) {
        alert(`Ingrediente "${nombre}" eliminado (simulación).`);
        location.reload();
    }
}
