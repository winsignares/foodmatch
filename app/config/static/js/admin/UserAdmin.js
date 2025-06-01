document.getElementById('sidebarCollapse').addEventListener('click', () => {
    sidebar.classList.toggle('active');
    content.classList.toggle('active');

    // Ocultar el contenido de la barra de navegación cuando el sidebar esté cerrado
    const navbar = document.querySelector('.navbar');
    if (sidebar.classList.contains('active')) {
        navbar.style.display = 'block';
    } else {
        navbar.style.display = 'none';
    }

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