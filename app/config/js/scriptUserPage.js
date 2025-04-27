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
    
    // Función para remover overlay
    function removeOverlay() {
        const overlay = document.getElementById('sidebar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // Cerrar el sidebar cuando la ventana se redimensiona a tamaño móvil
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
    
    // Simulación de carga de recetas populares
    function loadPopularRecipes() {
        // Mostrar indicador de carga
        loadingPlaceholder.classList.remove('d-none');
        noResultsMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Simular tiempo de carga
        setTimeout(function() {
            // Ocultar indicador de carga
            loadingPlaceholder.classList.add('d-none');
            
            // Datos de ejemplo para recetas populares
            const popularRecipes = [
                {
                    id: 1,
                    title: 'Tacos al Pastor',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Mexicana',
                   
                },
                {
                    id: 2,
                    title: 'Pizza Margherita',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Italiana',
                    
                },
                {
                    id: 3,
                    title: 'Pad Thai',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Asiática',
                    
                },
                {
                    id: 4,
                    title: 'Ensalada César',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Vegetariana',
                    
                },
                {
                    id: 5,
                    title: 'Paella Valenciana',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Española',
                    
                },
                {
                    id: 6,
                    title: 'Sushi Variado',
                    image: '../static/resources/pasta-carb-10.png',
                    category: 'Asiática',
                    
                }
            ];
            
            // Limpiar contenedor de recetas
            recipesRow.innerHTML = '';
            
            // Renderizar recetas
            popularRecipes.forEach(recipe => {
                const recipeCard = document.importNode(recipeCardTemplate.content, true);
                
                // Establecer datos de la receta
                recipeCard.querySelector('.card-img-top').src = recipe.image;
                recipeCard.querySelector('.card-img-top').alt = recipe.title;
                recipeCard.querySelector('.card-title').textContent = recipe.title;
                recipeCard.querySelector('.badge').textContent = recipe.category;
                
               
                
                
                // Añadir enlace a la receta
                recipeCard.querySelector('.btn-ver').href = `verReceta.html?id=${recipe.id}`;
                
                // Añadir la tarjeta al contenedor
                recipesRow.appendChild(recipeCard);
            });
            
            // Mostrar mensaje si no hay recetas
            if (popularRecipes.length === 0) {
                noResultsMessage.classList.remove('d-none');
            }
        }, 1500); // Simular 1.5 segundos de carga
    }
    
    // Cargar recetas populares al iniciar
    loadPopularRecipes();
    
    // Búsqueda de recetas
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Aquí iría la lógica para buscar recetas
            console.log('Buscando:', searchTerm);
            
            // Simular búsqueda
            loadingPlaceholder.classList.remove('d-none');
            recipesRow.innerHTML = '';
            
            // Simular tiempo de búsqueda
            setTimeout(function() {
                loadingPlaceholder.classList.add('d-none');
                // Aquí se mostrarían los resultados de la búsqueda
                // Por ahora, mostrar mensaje de no resultados como ejemplo
                noResultsMessage.classList.remove('d-none');
            }, 1000);
        }
    });
    
    // Permitir búsqueda con Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Filtrar por categoría
    if (categoryDropdown) {
        categoryDropdown.querySelectorAll('.dropdown-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                console.log('Filtrando por categoría:', category);
                
                // Aquí iría la lógica para filtrar por categoría
                // Simular filtrado
                loadingPlaceholder.classList.remove('d-none');
                recipesRow.innerHTML = '';
                
                // Simular tiempo de filtrado
                setTimeout(function() {
                    loadingPlaceholder.classList.add('d-none');
                    // Aquí se mostrarían los resultados filtrados
                    loadPopularRecipes(); // Por ahora, volver a cargar todas las recetas
                }, 1000);
            });
        });
    }
});