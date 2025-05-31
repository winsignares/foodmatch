async function obtenerIngredientesDelUsuario() {
    const userId = localStorage.getItem("idUsuario");
    if (!userId) {
        throw new Error("Usuario no autenticado");
    }
    try {
        const response = await axios.get(`/api/ingredientes/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los ingredientes del usuario:", error);
        throw error;
    }
}

async function cargarIngredientesDelUsuario() {
    try {
        const ingredientes = await obtenerIngredientesDelUsuario();

        if (ingredientes.length === 0) {
            document.getElementById("no-ingredients-message").classList.remove("d-none");
        } else {
            const ingredientsGrid = document.getElementById("ingredients-grid");
            ingredientsGrid.innerHTML = ""; // Limpia el contenedor

            ingredientes.forEach(ingrediente => {
                const template = document.getElementById("ingredient-card-template").content.cloneNode(true);
                template.querySelector(".ingredient-name").textContent = ingrediente.nombre;
                template.querySelector(".ingredient-origin").textContent = ingrediente.origen_nombre;

                // Agregar el atributo data-id al botón de eliminar
                const deleteButton = template.querySelector(".btn-delete-ingredient");
                deleteButton.dataset.id = ingrediente.id;

                ingredientsGrid.appendChild(template);
            });
        }
    } catch (error) {
        document.getElementById("error-ingredients-message").classList.remove("d-none");
    } finally {
        document.getElementById("loading-ingredients").classList.add("d-none");
    }
}

async function cargarInfoDelModal() {
    try {
        let ingredientes = await obtenerListaDeIngredientes(); // Cambiado a let
        const ingredientesDelUsuario = await obtenerIngredientesDelUsuario();

        // Filtrar ingredientes que el usuario ya tiene
        ingredientes = ingredientes.filter(
            ingrediente => !ingredientesDelUsuario.some(i => i.id === ingrediente.id)
        );

      console.log(ingredientes)
        const select = document.getElementById("ingredient-select");

        // Limpiar opciones previas
        select.innerHTML = "";

        // Opción por defecto
        const optionDefault = document.createElement("option");
        optionDefault.disabled = true;
        optionDefault.selected = true;
        optionDefault.textContent = "Selecciona un ingrediente";
        select.appendChild(optionDefault);

        // Agregar opciones de ingredientes disponibles
        ingredientes.forEach(ingrediente => {
            const option = document.createElement("option");
            option.value = ingrediente.id;
            option.textContent = ingrediente.nombre;
            select.appendChild(option);
        });

        // También cargamos los ingredientes del usuario en la interfaz
        await cargarIngredientesDelUsuario();

    } catch (error) {
        console.error("Error al cargar las opciones de ingredientes:", error);
    }
}



async function obtenerListaDeIngredientes() {
    try {
        const response = await axios.get("/api/ingredientes");
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de ingredientes:", error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Cargar los ingredientes del usuario
    cargarIngredientesDelUsuario();

    // Cuando se abra el modal, cargar las opciones en el select
    const modal = document.getElementById("addIngredientModal");
    modal.addEventListener("shown.bs.modal", () => {
        cargarInfoDelModal();
    });
});

document.getElementById("add-ingredient-btn").addEventListener("click", () => {
    const select = document.getElementById("ingredient-select");
    const selectedIngredientId = select.value;
    const selectedIngredientName = select.options[select.selectedIndex].text;

    if (!selectedIngredientId) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Por favor, selecciona un ingrediente antes de agregarlo.'
        });
        return;
    }

    const selectedIngredientsList = document.getElementById("selected-ingredients-list");

    // Verificar si el ingrediente ya está en la lista
    const existingIngredient = Array.from(selectedIngredientsList.children).find(
        item => item.dataset.id === selectedIngredientId
    );

    if (existingIngredient) {
        Swal.fire({
            icon: 'info',
            title: 'Ingrediente ya agregado',
            text: 'Este ingrediente ya está en la lista.'
        });
        return;
    }

    // Crear un nuevo elemento para la lista
    const ingredientItem = document.createElement("div");
    ingredientItem.className = "list-group-item d-flex justify-content-between align-items-center";
    ingredientItem.dataset.id = selectedIngredientId;
    ingredientItem.textContent = selectedIngredientName;

    // Botón para eliminar el ingrediente de la lista
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener("click", () => {
        selectedIngredientsList.removeChild(ingredientItem);
    });

    ingredientItem.appendChild(deleteButton);
    selectedIngredientsList.appendChild(ingredientItem);
});

async function guardarIngredientesEnFavoritos() {
    const userId = localStorage.getItem("idUsuario");
    if (!userId) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no autenticado.'
        });
        return;
    }

    const selectedIngredientsList = document.getElementById("selected-ingredients-list");
    const ingredientes = Array.from(selectedIngredientsList.children).map(item => parseInt(item.dataset.id));

    if (ingredientes.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'No hay ingredientes seleccionados para guardar.'
        });
        return;
    }

    const data = {
        id_usuario: parseInt(userId),
        ingredientes: ingredientes
    };

    try {
        const response = await axios.post('/api/ingredientes/favoritos', data);
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Ingredientes guardados en favoritos exitosamente.'
        });

        // Limpiar la lista de ingredientes seleccionados
        selectedIngredientsList.innerHTML = "";
    } catch (error) {
        console.error("Error al guardar ingredientes en favoritos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron guardar los ingredientes en favoritos.'
        });
    }
    cargarIngredientesDelUsuario()
}

// Asignar el evento al botón de guardar
document.getElementById("save-ingredient-btn").addEventListener("click", guardarIngredientesEnFavoritos);

async function eliminarIngredienteDeFavoritos(idIngrediente) {
    const userId = localStorage.getItem("idUsuario");
    if (!userId) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no autenticado.'
        });
        return;
    }

    // Mostrar SweetAlert de confirmación
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este ingrediente será eliminado de tus favoritos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
        return; // Si el usuario cancela, no se ejecuta la acción
    }

    const data = {
        id_usuario: parseInt(userId),
        id_ingrediente: idIngrediente
    };

    try {
            console.log("Datos enviados:", data); // Depuración

        const response = await axios.delete('/api/ingredientes/favoritos', { data });
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Ingrediente eliminado de favoritos exitosamente.'
        });

        // Recargar los ingredientes del usuario
        cargarIngredientesDelUsuario();
    } catch (error) {
        console.error("Error al eliminar ingrediente de favoritos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el ingrediente de favoritos.'
        });
    }
}
document.getElementById("ingredients-grid").addEventListener("click", (event) => {
    const button = event.target.closest(".btn-delete-ingredient");
    if (button) {
        const idIngrediente = button.dataset.id; // Asegúrate de que el botón tenga el atributo `data-id`
        eliminarIngredienteDeFavoritos(idIngrediente);
    }
});


document.getElementById("search-ingredient").addEventListener("input", () => {
    const searchText = document.getElementById("search-ingredient").value.toLowerCase();
    const ingredientCards = document.querySelectorAll("#ingredients-grid .ingredient-card");

    ingredientCards.forEach(card => {
        const ingredientName = card.querySelector(".ingredient-name").textContent.toLowerCase();
        if (ingredientName.includes(searchText)) {
            card.parentElement.style.display = ""; // Mostrar tarjeta
        } else {
            card.parentElement.style.display = "none"; // Ocultar tarjeta
        }
    });
});
