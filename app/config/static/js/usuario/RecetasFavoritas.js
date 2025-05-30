document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const loadingPlaceholder = document.getElementById('loading-placeholder');
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    const errorMessage = document.getElementById('error-message');
    const recipeCardTemplate = document.getElementById('recipe-card-template');
    const sidebarCollapse = document.getElementById('sidebarCollapse');

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

    // simula llamado de  backend API 
    async function fetchFavoriteRecipes(sortOption = 'date_desc') {
        try {
            
            // const response = await fetch(`/api/favorite-recipes?sort=${sortOption}`);
            // const recipes = await response.json();

            const recipes = [
                {
                    id: 1,
                    title: 'Tacos al Pastor',
                    image: '../static/resources/pasta-carb-10.png',
                    cuisine: 'Mexicana',
                    dateAdded: '2025-04-20'
                },
                {
                    id: 2,
                    title: 'Enchiladas Verdes',
                    image: '../static/resources/pasta-carb-10.png',
                    cuisine: 'Mexicana',
                    dateAdded: '2025-04-15'
                },
                {
                    id: 3,
                    title: 'Chiles Rellenos',
                    image: '../static/resources/pasta-carb-10.png',
                    cuisine: 'Mexicana',
                    dateAdded: '2025-04-10'
                }
            ];

            // Simulate sorting
            if (sortOption === 'title_asc') {
                recipes.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === 'title_desc') {
                recipes.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOption === 'date_desc') {
                recipes.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            }

            return recipes;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    }

    
    function renderRecipes(recipes) {
        favoritesContainer.innerHTML = ''; 
        if (recipes.length === 0) {
            noFavoritesMessage.classList.remove('d-none');
            return;
        }

        noFavoritesMessage.classList.add('d-none');
        recipes.forEach(recipe => {
            const cardClone = recipeCardTemplate.content.cloneNode(true);
            const card = cardClone.querySelector('.recipe-card');
            const img = card.querySelector('.card-img-top');
            const title = card.querySelector('.card-title');
            const badge = card.querySelector('.badge');
            const viewButton = card.querySelector('.btn-ver');

            img.src = recipe.image;
            img.alt = `Imagen de ${recipe.title}`;
            title.textContent = recipe.title;
            badge.textContent = recipe.cuisine;
            viewButton.href = `VerReceta.html?id=${recipe.id}`; // Adjust URL as needed

            favoritesContainer.appendChild(cardClone);
        });
    }

    
    async function loadRecipes(sortOption) {
        loadingPlaceholder.classList.remove('d-none');
        errorMessage.classList.add('d-none');

        try {
            const recipes = await fetchFavoriteRecipes(sortOption);
            renderRecipes(recipes);
        } catch (error) {
            errorMessage.classList.remove('d-none');
        } finally {
            loadingPlaceholder.classList.add('d-none');
        }
    }

    
    loadRecipes('date_desc');

    
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sortOption = e.target.dataset.sort;
            loadRecipes(sortOption);
        });
    });
});