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

    // Datos de ejemplo para recetas pendientes de aprobación
    const pendingRecipes = [
        {
            id: 1,
            title: 'Tacos de Pollo',
            image: '/resources/pasta-carb-10.png',
            user: 'Jhon Doe',
            category: 'Mexicana',
            dateSubmitted: '2025-04-20'
        },
        {
            id: 2,
            title: 'Enchiladas Verdes',
            image: '/resources/pasta-carb-10.png',
            user: 'María García',
            category: 'Mexicana',
            dateSubmitted: '2025-04-19'
        },
        {
            id: 3,
            title: 'Chiles Rellenos',
            image: '/resources/pasta-carb-10.png',
            user: 'Carlos López',
            category: 'Mexicana',
            dateSubmitted: '2025-04-18'
        },
        {
            id: 4,
            title: 'Pozole Rojo',
            image: '/resources/pasta-carb-10.png',
            user: 'Ana Martínez',
            category: 'Mexicana',
            dateSubmitted: '2025-04-17'
        },
        {
            id: 5,
            title: 'Mole Poblano',
            image: '/resources/pasta-carb-10.png',
            user: 'Luis Rodríguez',
            category: 'Mexicana',
            dateSubmitted: '2025-04-16'
        },
        {
            id: 6,
            title: 'Guacamole Tradicional',
            image: '/resources/pasta-carb-10.png',
            user: 'Sofía Hernández',
            category: 'Mexicana',
            dateSubmitted: '2025-04-15'
        }
    ];

    // Función para renderizar las recetas pendientes
    function renderPendingRecipes(recipesList) {
        const container = document.getElementById('approval-container');
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Renderizar cada receta
        recipesList.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'col-md-4 mb-4';
            
            recipeCard.innerHTML = `
                <div class="card recipe-card">
                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                    <div class="card-body">
                        <div class="user-info">
                            <i class="fas fa-user-circle"></i> ${recipe.user}
                        </div>
                        <h5 class="card-title">${recipe.title}</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-mexico">${recipe.category}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <a href="ViewRecipe.html?id=${recipe.id}" class="btn btn-ver">Ver</a>
                            <div>
                                <button class="action-btn btn-approve" title="Aprobar" onclick="approveRecipe(${recipe.id})">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="action-btn btn-comment" title="Comentar" onclick="openCommentModal(${recipe.id})">
                                    <i class="fas fa-comment"></i>
                                </button>
                                <button class="action-btn btn-reject" title="Rechazar" onclick="rejectRecipe(${recipe.id})">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(recipeCard);
        });
        
        // Si no hay recetas, mostrar mensaje
        if (recipesList.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-clipboard-check fa-3x mb-3 text-muted"></i>
                    <p>No hay recetas pendientes de aprobación.</p>
                </div>
            `;
        }
    }
    
    // Inicializar la página
    renderPendingRecipes(pendingRecipes);
    
    // Manejar búsqueda
    const searchInput = document.getElementById('recipe-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredRecipes = pendingRecipes.filter(recipe => 
                recipe.title.toLowerCase().includes(searchTerm) || 
                recipe.user.toLowerCase().includes(searchTerm) ||
                recipe.category.toLowerCase().includes(searchTerm)
            );
            renderPendingRecipes(filteredRecipes);
        });
    }
    
    // Manejar ordenamiento
    const sortLinks = document.querySelectorAll('.dropdown-item[data-sort]');
    sortLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sortType = e.target.getAttribute('data-sort');
            let sortedRecipes = [...pendingRecipes];
            
            switch (sortType) {
                case 'date_desc':
                    sortedRecipes.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));
                    break;
                case 'title_asc':
                    sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title_desc':
                    sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
                    break;
            }
            
            renderPendingRecipes(sortedRecipes);
            
            // Actualizar texto del botón de ordenamiento
            const sortButton = document.getElementById('sort-button');
            const sortText = e.target.textContent;
            sortButton.innerHTML = `<i class="fas fa-sort"></i> ${sortText}`;
        });
    });
    
    // Configurar el modal de comentarios
    const commentModal = new bootstrap.Modal(document.getElementById('commentModal'));
    
    // Manejar envío de comentarios
    document.getElementById('submitComment').addEventListener('click', () => {
        const recipeId = document.getElementById('recipeId').value;
        const commentText = document.getElementById('commentText').value;
        
        if (commentText.trim() === '') {
            alert('Por favor, escribe un comentario antes de enviar.');
            return;
        }
        
        // Aquí iría la lógica para enviar el comentario (ej. llamada a API)
        alert(`Comentario enviado para la receta ID ${recipeId}: "${commentText}"`);
        
        // Cerrar el modal y limpiar el formulario
        commentModal.hide();
        document.getElementById('commentForm').reset();
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

// Función para abrir el modal de comentarios
function openCommentModal(recipeId) {
    document.getElementById('recipeId').value = recipeId;
    const commentModal = new bootstrap.Modal(document.getElementById('commentModal'));
    commentModal.show();
}

// Función para aprobar receta
function approveRecipe(id) {
    if (confirm('¿Estás seguro de que deseas aprobar esta receta?')) {
        // Aquí iría la lógica para aprobar la receta (ej. llamada a API)
        alert(`Receta con ID ${id} aprobada (simulación).`);
        // Recargar la página o actualizar la lista
        location.reload();
    }
}

// Función para rechazar receta
function rejectRecipe(id) {
    if (confirm('¿Estás seguro de que deseas rechazar esta receta?')) {
        // Aquí iría la lógica para rechazar la receta (ej. llamada a API)
        alert(`Receta con ID ${id} rechazada (simulación).`);
        // Recargar la página o actualizar la lista
        location.reload();
    }
}