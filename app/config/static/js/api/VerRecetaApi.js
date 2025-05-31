
document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname; // "/recetas/5"
    const partes = path.split('/'); // ["", "recetas", "5"]
    const id = partes[2]; // "5"

    if (id) {
        try {
            const receta = await obtenerRecetaPorId(id);
            renderizarReceta(receta);
        } catch (error) {
            console.error("No se pudo cargar la receta.");
            // Aquí podrías mostrar un mensaje en la página
        }
    } else {
        console.error("ID de receta no encontrado en la URL.");
    }
});



async function obtenerRecetaPorId(id) {
    try {
        const response = await axios.get(`/api/recetas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la receta:', error);
        throw error;
    }
}

function renderizarReceta(receta) {
    // Título
    document.getElementById("recipe-title").textContent = receta.nombre;

    // Imagen de fondo
    const header = document.getElementById("recipe-header");
    header.style.backgroundImage = `url('/static${receta.foto}')`;

    // Categorías
    const categoriesDetail = document.getElementById("categories-detail");
    categoriesDetail.innerHTML = "";

    receta.categorias.forEach(cat => {

        const detail = document.createElement("div");
        detail.className = "category-detail-item";
        detail.innerHTML = `<h5>${cat.nombre}</h5><p>${cat.descripcion}</p>`;
        categoriesDetail.appendChild(detail);
    });

    // Ingredientes
    const ingredientsContainer = document.getElementById("ingredients-container");
    ingredientsContainer.innerHTML = "";
    receta.ingredientes.forEach(ing => {
        const item = document.createElement("div");
        item.className = "ingredient-item mb-2";
        item.innerHTML = `<strong>${ing.nombre}</strong> (${ing.origen_nombre})`;
        ingredientsContainer.appendChild(item);
    });

    // Pasos
    const pasosContainer = document.getElementById("preparation-steps");
    pasosContainer.innerHTML = "";
    receta.pasos.forEach(paso => {
        const step = document.createElement("div");
        step.className = "step mb-3";
        step.innerHTML = `<h5 style="color: #FD7E14;" ><strong>Paso ${paso.numero}</strong></h5><p>${paso.descripcion}</p>`;
        pasosContainer.appendChild(step);
    });

    // Dieta

   // Vegetariano
const vegetarianDiv = document.getElementById("is-vegetarian-detail");
vegetarianDiv.className = `diet-item${receta.es_vegetariano ? "" : " diet-no"}`;
vegetarianDiv.innerHTML = `<i class="fas fa-leaf"></i> <span>${receta.es_vegetariano ? "Vegetariano" : "No vegetariano"}</span>`;

// Vegano
const veganDiv = document.getElementById("is-vegan-detail");
veganDiv.className = `diet-item${receta.es_vegano ? "" : " diet-no"}`;
veganDiv.innerHTML = `<i class="fas fa-seedling"></i> <span>${receta.es_vegano ? "Vegano" : "No vegano"}</span>`;

}
