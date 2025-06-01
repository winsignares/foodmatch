// Mostrar el modal al hacer clic en el botón de recomendación
document.getElementById('recommendation-button').addEventListener('click', () => {
    const recommendationModal = new bootstrap.Modal(document.getElementById('recommendationModal'));
    recommendationModal.show();
});

// Cargar categorías al mostrar el modal
document.addEventListener('DOMContentLoaded', () => {
    const recommendationModal = document.getElementById('recommendationModal');

    recommendationModal.addEventListener('show.bs.modal', async () => {
        await cargarCategorias();
    });
});

// Función para cargar las categorías desde la API
async function cargarCategorias() {
    try {
        const response = await axios.get('/api/categorias');
        const categoriesSelect = document.getElementById('categories-select');
        categoriesSelect.innerHTML = ''; // Limpiar opciones existentes

        response.data.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.nombre;
            categoriesSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudieron cargar las categorías. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Agregar categoría seleccionada a la lista
document.getElementById('add-category-button').addEventListener('click', () => {
    const select = document.getElementById('categories-select');
    const selectedId = select.value;
    const selectedText = select.options[select.selectedIndex].text;

    // Verificar si ya fue agregada
    const existing = Array.from(document.querySelectorAll('#selected-categories-list li'))
        .some(li => li.dataset.id === selectedId);

    if (existing) return;

    const list = document.getElementById('selected-categories-list');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.dataset.id = selectedId;
    listItem.textContent = selectedText;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger btn-sm';
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.addEventListener('click', () => listItem.remove());

    listItem.appendChild(removeButton);
    list.appendChild(listItem);
});
// Enviar categorías seleccionadas al backend con el id_usuario
document.getElementById('submit-recommendation').addEventListener('click', async () => {
   obtenerRecomendacion()
});
async function obtenerRecomendacion() {
    const idUsuario = localStorage.getItem("idUsuario");
    const recipesRow = document.getElementById('recipes-row');
    const loadingPlaceholder = document.getElementById('loading-placeholder');

    if (!idUsuario) {
        console.error("No se encontró el idUsuario en localStorage.");
        return;
    }

    try {
        const data = {
            id_usuario: parseInt(idUsuario, 10),
            categorias: Array.from(document.querySelectorAll('#selected-categories-list li'))
                .map(li => parseInt(li.dataset.id, 10))
        };

        // Mostrar marcador de carga
        if (loadingPlaceholder) loadingPlaceholder.classList.remove('d-none');
        recipesRow.innerHTML = '';
        if (loadingPlaceholder) recipesRow.appendChild(loadingPlaceholder);

        const response = await axios.post(`/api/recetas/recomendar`, data);
        const recetas = response.data;

        // Ocultar marcador de carga
        if (loadingPlaceholder) loadingPlaceholder.classList.add('d-none');
        recipesRow.innerHTML = '';

        if (recetas.length === 0) {
            recipesRow.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-book fa-3x mb-3 text-muted"></i>
                    <p>No se encontraron recetas recomendadas.</p>
                </div>
            `;
            return;
        }

        recetas.forEach(receta => {
            const tarjetaReceta = document.createElement('div');
            tarjetaReceta.className = 'col-md-4 col-sm-6 mb-4';

            const nombre = receta.nombre || 'Sin título';
            const imagen = receta.foto;
            const cocina = receta.categorias?.[0]?.nombre || 'Sin categoría';

            tarjetaReceta.innerHTML = `
                <div class="card recipe-card">
                    <img src="../../static${imagen}" class="card-img-top" alt="${nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-mexico">${cocina}</span>
                        </div>
                        <button class="btn btn-ver mt-2" onclick="window.location.href='/recetas/${receta.id}'">Ver</button>
                    </div>
                </div>
            `;

            recipesRow.appendChild(tarjetaReceta);
        });

        // Cerrar el modal
        const recommendationModal = bootstrap.Modal.getInstance(document.getElementById('recommendationModal'));
        recommendationModal.hide();
    } catch (error) {
        console.error("Error al cargar las recomendaciones:", error);
        recipesRow.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-circle fa-3x mb-3 text-danger"></i>
                <p>Ocurrió un error al cargar las recetas recomendadas.</p>
            </div>
        `;
    }
}