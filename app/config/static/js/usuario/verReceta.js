

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
        console.error("No se proporcionó un ID de receta.");
        return;
    }

    try {
        const receta = await obtenerRecetaPorId(id);
        renderizarReceta(receta);
    } catch (error) {
        mostrarError("No se pudo cargar la receta.");
    }
});

function renderizarReceta(receta) {
    // Título
    document.getElementById("recipe-title").textContent = receta.nombre;

    // Imagen de fondo
    const header = document.getElementById("recipe-header");
    header.style.backgroundImage = `url(${receta.foto})`;

    // Categorías
    const categoriesContainer = document.getElementById("categories-container");
    const categoriesDetail = document.getElementById("categories-detail");
    categoriesContainer.innerHTML = "";
    categoriesDetail.innerHTML = "";

    receta.categorias.forEach(cat => {
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary me-2";
        badge.textContent = cat.nombre;
        categoriesContainer.appendChild(badge);

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
        step.innerHTML = `<h5>Paso ${paso.numero}</h5><p>${paso.descripcion}</p>`;
        pasosContainer.appendChild(step);
    });

    // Dieta
    document.getElementById("is-vegetarian").classList.toggle("diet-no", !receta.es_vegetariano);
    document.getElementById("is-vegan").classList.toggle("diet-no", !receta.es_vegano);
    document.getElementById("is-vegetarian-detail").innerHTML = `<i class="fas fa-leaf"></i> <span>${receta.es_vegetariano ? "Vegetariano" : "No vegetariano"}</span>`;
    document.getElementById("is-vegan-detail").innerHTML = `<i class="fas fa-seedling"></i> <span>${receta.es_vegano ? "Vegano" : "No vegano"}</span>`;
}

function mostrarError(msg) {
    alert(msg); // Puedes reemplazar por algo más elegante
}
