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
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Mexicana',
                    rating: 4.5
                },
                {
                    id: 2,
                    title: 'Pizza Margherita',
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Italiana',
                    rating: 4.8
                },
                {
                    id: 3,
                    title: 'Pad Thai',
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Asiática',
                    rating: 4.3
                },
                {
                    id: 4,
                    title: 'Ensalada César',
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Vegetariana',
                    rating: 4.0
                },
                {
                    id: 5,
                    title: 'Paella Valenciana',
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Española',
                    rating: 4.7
                },
                {
                    id: 6,
                    title: 'Sushi Variado',
                    image: '/placeholder.svg?height=200&width=350',
                    category: 'Asiática',
                    rating: 4.9
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
                
                // Generar estrellas para la calificación
                const ratingContainer = recipeCard.querySelector('.rating');
                const fullStars = Math.floor(recipe.rating);
                const hasHalfStar = recipe.rating % 1 >= 0.5;
                
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('i');
                    if (i < fullStars) {
                        star.className = 'fas fa-star';
                    } else if (i === fullStars && hasHalfStar) {
                        star.className = 'fas fa-star-half-alt';
                    } else {
                        star.className = 'far fa-star';
                    }
                    ratingContainer.appendChild(star);
                }
                
                // Añadir enlace a la receta
                recipeCard.querySelector('.btn-ver').href = `receta.html?id=${recipe.id}`;
                
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