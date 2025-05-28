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

    // Simula datos de usuarios (puedes reemplazar con una llamada a una API)
    const usuarios = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '555-123-4567', email: 'juan.perez@example.com' },
        { id: 2, nombre: 'María', apellido: 'Gómez', telefono: '555-987-6543', email: 'maria.gomez@example.com' },
        { id: 3, nombre: 'Carlos', apellido: 'López', telefono: '555-456-7890', email: 'carlos.lopez@example.com' },
        { id: 4, nombre: 'Ana', apellido: 'Martínez', telefono: '555-321-6547', email: 'ana.martinez@example.com' },
        { id: 5, nombre: 'Luis', apellido: 'Rodríguez', telefono: '555-654-9876', email: 'luis.rodriguez@example.com' }
    ];

    // Inicializar DataTable
    $('#usuariosTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        data: usuarios,
        columns: [
            { data: 'nombre' },
            { data: 'apellido' },
            { data: 'telefono' },
            { data: 'email' },
            {
                data: null,
                render: function (data) {
                    return `
                        <a href="#" class="btn btn-sm btn-danger" style="border-radius: 20px;" onclick="confirmDelete(${data.id})">Eliminar</a>
                    `;
                }
            }
        ],
        pageLength: 5,
        responsive: true
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

// Función para confirmar eliminación (puedes personalizarla según tu backend)
function confirmDelete(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        // Aquí iría la lógica para eliminar el usuario (ej. llamada a API)
        alert(`Usuario con ID ${id} eliminado (simulación).`);
    }
}