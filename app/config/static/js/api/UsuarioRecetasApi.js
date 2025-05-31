async function obtenerRecetas() {
    const recipesRow = document.getElementById('recipes-row');
    const loadingPlaceholder = document.getElementById('loading-placeholder');
    const noResultsMessage = document.getElementById('no-results-message');
    const errorMessage = document.getElementById('error-message');

    // Oculta mensajes previos
    if (noResultsMessage) noResultsMessage.classList.add('d-none');
    if (errorMessage) errorMessage.classList.add('d-none');

    try {
        if (loadingPlaceholder) loadingPlaceholder.classList.remove('d-none');
        recipesRow.innerHTML = '';
        if (loadingPlaceholder) recipesRow.appendChild(loadingPlaceholder);

        const respuesta = await axios.get('/api/recetas');
        const recetas = respuesta.data;

        if (loadingPlaceholder) loadingPlaceholder.classList.add('d-none');
        recipesRow.innerHTML = '';

        if (recetas.length === 0) {
            recipesRow.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-book fa-3x mb-3 text-muted"></i>
                    <p>No se encontraron recetas. ¡Agrega una nueva!</p>
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
                    <img src="${imagen}" class="card-img-top" alt="${nombre}">
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
    } catch (error) {
        console.error('Error al cargar recetas:', error);
        recipesRow.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-circle fa-3x mb-3 text-danger"></i>
                <p>Ocurrió un error al cargar las recetas.</p>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".btn-ver").forEach((btn) => {
        btn.addEventListener("click", () => {
            const recetaId = btn.getAttribute("data-id")
          
            window.location.href = `recetas/${id}`
        })
    })
})
document.addEventListener('DOMContentLoaded', obtenerRecetas);


// async function obtenerRecetasFavoritas(usuarioId) {
//     try {
//         const response = await axios.get(`/api/recetas/favoritos/${usuarioId}`);
//         const recetas = response.data;

//         recetas.forEach(receta => {
//             const tarjetaReceta = document.createElement('div');
//             tarjetaReceta.className = 'col-md-4 col-sm-6 mb-4';

//             const nombre = receta.nombre || 'Sin título';
//             const imagen = receta.foto;
//             const cocina = receta.categorias?.[0]?.nombre || 'Sin categoría';

//             tarjetaReceta.innerHTML = `
//                 <div class="card recipe-card">
//                     <img src="${imagen}" class="card-img-top" alt="${nombre}">
//                     <div class="card-body">
//                         <h5 class="card-title">${nombre}</h5>
//                         <div class="d-flex justify-content-between align-items-center mb-2">
//                             <span class="badge bg-mexico">${cocina}</span>
//                         </div>
//                             <button class="btn btn-ver mt-2" onclick="window.location.href='/recetas/ver?id=${receta.id}'">Ver</button>
//                     </div>
//                 </div>
//             `;

//             recipesRow.appendChild(tarjetaReceta);
//         });
//     } catch (error) {
//         console.error('Error al obtener recetas favoritas:', error);
//         throw error;
//     }
// }
// document.addEventListener('DOMContentLoaded', obtenerRecetasFavoritas);

