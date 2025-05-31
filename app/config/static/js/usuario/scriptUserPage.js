document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryDropdown = document.getElementById('category-dropdown');
    const recipesRow = document.getElementById('recipes-row');
    const loadingPlaceholder = document.getElementById('loading-placeholder');
    const noResultsMessage = document.getElementById('no-results-message');
    const errorMessage = document.getElementById('error-message');
    const recipeCardTemplate = document.getElementById('recipe-card-template');
    
    // Comprobar si es un dispositivo móvil
    const isMobile = window.innerWidth <= 768;
    
    // Cerrar el sidebar por defecto en dispositivos móviles
    if (isMobile) {
        sidebar.classList.remove('active');
        content.classList.remove('active');
        sidebar.style.marginLeft = '-250px';
    }
    
    // Toggle para el sidebar
    sidebarCollapse.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        
        // En móvil, controlar la posición del sidebar
        if (window.innerWidth <= 768) {
            if (sidebar.style.marginLeft === '-250px' || sidebar.style.marginLeft === '') {
                sidebar.style.marginLeft = '0';
                // Añadir overlay para cerrar el sidebar al hacer clic fuera
                addOverlay();
            } else {
                sidebar.style.marginLeft = '-250px';
                // Remover overlay
                removeOverlay();
            }
        }
    });
    
    // Función para añadir overlay
    function addOverlay() {
        // Verificar si ya existe un overlay
        if (!document.getElementById('sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
            
            // Cerrar sidebar al hacer clic en el overlay
            overlay.addEventListener('click', function() {
                sidebar.style.marginLeft = '-250px';
                removeOverlay();
            });
        }
    }
    

    function removeOverlay() {
        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    

    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!sidebar.classList.contains('active')) {
                sidebar.style.marginLeft = '-250px';
                removeOverlay();
            }
        } else {
  
            sidebar.style.marginLeft = '0';
            removeOverlay();
        }
    });
    
});