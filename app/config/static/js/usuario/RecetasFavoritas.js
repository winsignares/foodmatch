// import { obtenerRecetasFavoritas } from '../api/UsuarioRecetasApi.js';

document.addEventListener('DOMContentLoaded', async () => {
    const usuarioId = 4; // ejemplo, reemplaza con ID dinámico si aplica
    const container = document.getElementById('recipes-row');
    const errorMsg = document.getElementById('error-message');
    const emptyMsg = document.getElementById('no-favorites-message');

    try {
        const recetas = await obtenerRecetasFavoritas(usuarioId);
        if (recetas.length === 0) {
            emptyMsg.classList.remove('d-none');
        } else {
            recetas.forEach(r => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <div class="card">
                        <img src="${r.imagen_url}" class="card-img-top" alt="${r.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${r.nombre}</h5>
                            <p class="card-text">${r.descripcion}</p>
                        </div>
                    </div>`;
                container.appendChild(card);
            });
        }
    } catch {
        errorMsg.classList.remove('d-none');
    }
});

    async function loadRecipes(id, sortOption) {
        loadingPlaceholder.classList.remove('d-none');
        errorMessage.classList.add('d-none');
        noFavoritesMessage.classList.add('d-none');

        try {
            const recipes = await fetchFavoriteRecipes(id, sortOption);
            renderRecipes(recipes);
        } catch (error) {
            errorMessage.classList.remove('d-none');
        } finally {
            loadingPlaceholder.classList.add('d-none');
        }
    }

    // Obtener ID de usuario desde URL o un valor por defecto
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || 1; // Cambia '1' por el ID por defecto si es necesario
    loadRecipes(id, 'date_desc');

    // Manejo de ordenación
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sortOption = e.target.dataset.sort;
            loadRecipes(id, sortOption);
        });
    });
