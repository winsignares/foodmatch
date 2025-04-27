document.addEventListener('DOMContentLoaded', () => {
    // Verificar si es dispositivo móvil
    const isMobile = window.innerWidth < 768;
    
    // Toggle sidebar
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const body = document.body;
    
    // En dispositivos móviles, asegurarse de que el sidebar esté cerrado por defecto
    if (isMobile) {
        sidebar.classList.remove('active');
        content.classList.remove('active');
    }
    
    document.getElementById('sidebarCollapse').addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        
        // En móviles, añadir clase al body para oscurecer el fondo cuando el sidebar está abierto
        if (isMobile) {
            if (sidebar.classList.contains('active')) {
                body.classList.add('sidebar-active');
            } else {
                body.classList.remove('sidebar-active');
            }
        }
    });
    
    // Cerrar sidebar al hacer clic fuera de él en dispositivos móviles
    document.addEventListener('click', (e) => {
        if (isMobile && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !document.getElementById('sidebarCollapse').contains(e.target)) {
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-active');
        }
    });

    // Datos de ejemplo para ingredientes
    const ingredientes = [
        {
            id: 1,
            nombre: 'Tomate',
            origen: 'animal'
            
        },
        {
            id: 2,
            nombre: 'Cilantro',
            origen: 'animal'

        },
        {
            id: 3,
            nombre: 'Chile Habanero',
             origen: 'animal'
            
        },
        {
            id: 4,
            nombre: 'Aguacate',
            origen: 'animal'
        },
        {
            id: 5,
            nombre: 'Maíz',
             origen: 'animal'
               },
        {
            id: 6,
            nombre: 'Epazote',
             origen: 'animal'
        },
        {
            id: 7,
            nombre: 'Frijol Negro',
             origen: 'animal'
            
        },
        {
            id: 8,
            nombre: 'Nopal',
             origen: 'animal'
            
        }
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
                render: function(data, type, row) {
                    return `<span class="fw-medium">${data}</span>`;
                }
            },
            
            { data: 'origen' },
           
            {
                data: null,
                className: 'text-end',
                render: function(data) {
                    return `
                        <a href="EditIngredient.html?id=${data.id}" class="btn btn-sm btn-primary">Editar</a>
                        <button class="btn btn-sm btn-danger" onclick="confirmDeleteIngredient(${data.id})">Eliminar</button>
                    `;
                }
            }
        ],
        responsive: true,
        pageLength: 10,
        dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>'
    });
    
    // Ajustar el diseño cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth < 768;
        
        // Si cambia de móvil a desktop o viceversa
        if (currentIsMobile !== isMobile) {
            location.reload(); // Recargar para aplicar los estilos correctos
        }
    });
});

// Función para confirmar eliminación de ingrediente
function confirmDeleteIngredient(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este ingrediente?')) {
        // Aquí iría la lógica para eliminar el ingrediente (ej. llamada a API)
        alert(`Ingrediente con ID ${id} eliminado (simulación).`);
        // Recargar la página o actualizar la tabla
        location.reload();
    }
}