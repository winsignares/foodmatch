
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


    // Ajustar el diseño cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        const currentIsMobile = window.innerWidth < 768;
        
        // Si cambia de móvil a desktop o viceversa
        if (currentIsMobile !== isMobile) {
            location.reload(); // Recargar para aplicar los estilos correctos
        }
    });
});

