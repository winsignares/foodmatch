document.addEventListener('DOMContentLoaded', async () => {
    const usuarioId = localStorage.getItem('idUsuario'); // Reemplaza con el ID dinámico del usuario
    const container = document.getElementById('recipes-row');
    const errorMsg = document.getElementById('error-message');
    const emptyMsg = document.getElementById('no-favorites-message');

    try {
        const recetas = await obtenerRecetasFavoritas(usuarioId);

        if (recetas.length === 0) {
            emptyMsg.classList.remove('d-none');
        } else {
            renderizarRecetasFavoritas(recetas, container);
        }
    } catch (error) {
        console.error('Error al cargar las recetas favoritas:', error);
        errorMsg.classList.remove('d-none');
    }
});

async function obtenerRecetasFavoritas(usuarioId) {
    try {
        const response = await axios.get(`/api/recetas/favoritos/${usuarioId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las recetas favoritas:', error);
        throw error;
    }
}

function renderizarRecetasFavoritas(recetas, container) {
    container.innerHTML = ''; // Limpiar el contenedor

    recetas.forEach(receta => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card shadow-sm">
                <img src="../../static${receta.foto}" class="card-img-top" alt="${receta.nombre}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 style="color: #FD7E14;" class="card-title"><strong>${receta.nombre}</strong></h5>
                    <p class="card-text text-muted">${receta.categorias.map(cat => cat.nombre).join(', ')}</p>
                    <p class="card-text"><strong>Vegano:</strong> ${receta.es_vegano ? 'Sí' : 'No'}</p>
                    <p class="card-text"><strong>Vegetariano:</strong> ${receta.es_vegetariano ? 'Sí' : 'No'}</p>
                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-submit btn-sm" onclick="verReceta(${receta.id})">
                            <i class="fas fa-eye"></i> Ver Receta
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarRecetaFavorita(${receta.id})">
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function verReceta(idReceta) {
    window.location.href = `/recetas/${idReceta}`;
}

async function eliminarRecetaFavorita(idReceta) {
    const usuarioId = localStorage.getItem('idUsuario'); // Reemplaza con el ID dinámico del usuario

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la receta de tus favoritos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const payload = {
                    id_usuario: usuarioId,
                    id_receta: idReceta
                };

                await axios.delete('/api/recetas/favoritos', { data: payload });

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'La receta se ha eliminado de tus favoritos.'
                });

                // Recargar las recetas favoritas
                const container = document.getElementById('recipes-row');
                const recetas = await obtenerRecetasFavoritas(usuarioId);
                renderizarRecetasFavoritas(recetas, container);
            } catch (error) {
                console.error('Error al eliminar la receta de favoritos:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar la receta de favoritos.'
                });
            }
        }
    });
}