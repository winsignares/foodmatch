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

    // Simular carga de recetas
    const recipes = [
        {
            id: 1,
            title: 'Tacos al Pastor',
            image: 'https://via.placeholder.com/300x200?text=Tacos+al+Pastor',
            cuisine: 'Mexicana',
        
        },
        {
            id: 2,
            title: 'Enchiladas Verdes',
            image: 'https://via.placeholder.com/300x200?text=Enchiladas+Verdes',
            cuisine: 'Mexicana',
            
        },
        {
            id: 3,
            title: 'Chiles Rellenos',
            image: 'https://via.placeholder.com/300x200?text=Chiles+Rellenos',
            cuisine: 'Mexicana',
           
        },
        {
            id: 4,
            title: 'Pozole Rojo',
            image: 'https://via.placeholder.com/300x200?text=Pozole+Rojo',
            cuisine: 'Mexicana',
          
        },
        {
            id: 5,
            title: 'Mole Poblano',
            image: 'https://via.placeholder.com/300x200?text=Mole+Poblano',
            cuisine: 'Mexicana',
            
        },
        {
            id: 6,
            title: 'Guacamole Tradicional',
            image: 'https://via.placeholder.com/300x200?text=Guacamole+Tradicional',
            cuisine: 'Mexicana',
            
        }
    ];

    // Función para renderizar las recetas
    function renderRecipes(recipesList) {
        const container = document.getElementById('recipes-container');
        const loadingPlaceholder = document.getElementById('loading-placeholder');
        
        // Simular tiempo de carga
        setTimeout(() => {
            // Eliminar el placeholder de carga
            if (loadingPlaceholder) {
                loadingPlaceholder.remove();
            }
            
            // Limpiar el contenedor
            container.innerHTML = '';
            
            // Renderizar cada receta
            recipesList.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'col-md-4 col-sm-6 mb-4';
                recipeCard.innerHTML = `
                    <div class="card recipe-card">
                        <div class="recipe-actions">
                            <a href="EditRecipe.html?id=${recipe.id}" class="btn btn-edit" title="Editar receta">
                                <i class="fas fa-edit"></i>
                            </a>
                            <button class="btn btn-delete" title="Eliminar receta" onclick="confirmDeleteRecipe(${recipe.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-mexico">${recipe.cuisine}</span>
                               
                            </div>
                            <a href="ViewRecipe.html?id=${recipe.id}" class="btn btn-ver mt-2">Ver</a>
                        </div>
                    </div>
                `;
                container.appendChild(recipeCard);
            });
            
            // Si no hay recetas, mostrar mensaje
            if (recipesList.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-book fa-3x mb-3 text-muted"></i>
                        <p>No se encontraron recetas. ¡Agrega una nueva!</p>
                    </div>
                `;
            }
        }, 1000); // Simular 1 segundo de carga
    }
    
    // Formatear fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    
    // Inicializar la página
    renderRecipes(recipes);
    
    // Manejar búsqueda
    const searchInput = document.getElementById('recipe-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe => 
                recipe.title.toLowerCase().includes(searchTerm) || 
                recipe.cuisine.toLowerCase().includes(searchTerm)
            );
            renderRecipes(filteredRecipes);
        });
    }
    
    // Manejar ordenamiento
    const sortLinks = document.querySelectorAll('.dropdown-item[data-sort]');
    sortLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sortType = e.target.getAttribute('data-sort');
            let sortedRecipes = [...recipes];
            
            switch (sortType) {
                case 'date_desc':
                    sortedRecipes.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    break;
                case 'title_asc':
                    sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title_desc':
                    sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
                    break;
            }
            
            renderRecipes(sortedRecipes);
            
            // Actualizar texto del botón de ordenamiento
            const sortButton = document.getElementById('sort-button');
            const sortText = e.target.textContent;
            sortButton.innerHTML = `<i class="fas fa-sort"></i> ${sortText}`;
        });
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

// Función para confirmar eliminación de receta
function confirmDeleteRecipe(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
        // Aquí iría la lógica para eliminar la receta (ej. llamada a API)
        alert(`Receta con ID ${id} eliminada (simulación).`);
        // Recargar la página o actualizar la lista de recetas
        location.reload();
    }
}