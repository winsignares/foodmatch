document.addEventListener("DOMContentLoaded", () => {
  console.log("Documento cargado, iniciando aplicación...")

  // Obtener el ID de la receta de la URL
  const urlParams = new URLSearchParams(window.location.search)
  const recipeId = urlParams.get("id") || 1 // Si no hay ID, usar 1 por defecto
  console.log(`ID de receta a cargar: ${recipeId}`)

  // Cargar los datos de la receta
  loadRecipeDetails(recipeId)

  // Configurar eventos
  setupEventListeners()
})

// Función para cargar los detalles de la receta
function loadRecipeDetails(recipeId) {
  console.log(`Cargando receta con ID: ${recipeId}`)

  // En una aplicación real, aquí se haría una petición al backend
  // Simulamos una carga con setTimeout
  setTimeout(() => {
    try {
      // Datos de ejemplo para una receta
      const recipeData = {
        id: recipeId,
        nombre: "Pasta Carbonara Auténtica",
        foto: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
        esVegano: false,
        esVegetariano: true,
        categorias: [
          { nombre: "Pasta", descripcion: "Platos a base de pasta" },
          { nombre: "Italiana", descripcion: "Cocina tradicional italiana" },
          { nombre: "Cena", descripcion: "Ideal para la cena" },
        ],
        ingredientes: [
          { nombre: "Espaguetis", origen: { nombre: "Cereal", descripcion: "Derivado del trigo" } },
          { nombre: "Guanciale", origen: { nombre: "Cárnico", descripcion: "Carne curada de cerdo" } },
          { nombre: "Huevos", origen: { nombre: "Animal", descripcion: "Producto de origen animal" } },
          {
            nombre: "Queso Pecorino Romano",
            origen: { nombre: "Lácteo", descripcion: "Derivado de la leche de oveja" },
          },
          { nombre: "Pimienta Negra", origen: { nombre: "Condimento", descripcion: "Especia molida" } },
          { nombre: "Sal", origen: { nombre: "Condimento", descripcion: "Mineral para sazonar" } },
        ],
        pasos: [
          "Corta el guanciale en tiras pequeñas. Ralla el queso pecorino romano. En un bol, bate los huevos y mezcla con la mitad del queso rallado y una generosa cantidad de pimienta negra recién molida.",
          "Hierve abundante agua con sal. Añade los espaguetis y cocínalos según las instrucciones del paquete hasta que estén al dente. Reserva una taza del agua de cocción antes de escurrir.",
          "Mientras se cocina la pasta, saltea el guanciale en una sartén grande a fuego medio-bajo sin añadir aceite, hasta que esté crujiente y haya soltado su grasa. Retira del fuego.",
          "Añade la pasta escurrida a la sartén con el guanciale y mezcla bien. Retira completamente del fuego y deja enfriar un minuto. Agrega la mezcla de huevo y queso, revolviendo rápidamente para que el calor residual cocine los huevos pero sin cuajarlos.",
          "Si la salsa está demasiado espesa, añade un poco del agua de cocción reservada hasta conseguir una textura cremosa. Sirve inmediatamente con el resto del queso rallado por encima y más pimienta negra al gusto.",
        ],
      }

      console.log("Datos de receta cargados:", recipeData)

      // Actualizar la interfaz con los datos de la receta
      updateRecipeUI(recipeData)
    } catch (error) {
      console.error("Error al cargar los datos de la receta:", error)
      showErrorMessage("Ha ocurrido un error al cargar la receta. Por favor, intenta de nuevo más tarde.")
    }
  }, 1000)
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
  const container = document.querySelector(".recipe-detail-container")
  if (container) {
    const errorDiv = document.createElement("div")
    errorDiv.className = "alert alert-danger my-4"
    errorDiv.textContent = message

    // Insertar al principio del contenedor
    container.insertBefore(errorDiv, container.firstChild)
  }
}

// Función para actualizar la interfaz con los datos de la receta
function updateRecipeUI(recipe) {
  try {
    console.log("Actualizando UI con datos de receta")

    // Actualizar título y cabecera
    document.title = `FoodMatch - ${recipe.nombre}`
    const titleElement = document.getElementById("recipe-title")
    if (titleElement) {
      titleElement.textContent = recipe.nombre
      console.log("Título actualizado:", recipe.nombre)
    } else {
      console.error("Elemento 'recipe-title' no encontrado")
    }

    // Actualizar imagen de fondo
    const headerElement = document.getElementById("recipe-header")
    if (headerElement) {
      headerElement.style.backgroundImage = `url('${recipe.foto}')`
      console.log("Imagen de fondo actualizada")
    } else {
      console.error("Elemento 'recipe-header' no encontrado")
    }

    // Actualizar información dietética
    updateDietInfo("is-vegetarian", recipe.esVegetariano, "Vegetariano", "No vegetariano")
    updateDietInfo("is-vegan", recipe.esVegano, "Vegano", "No vegano")
    updateDietInfo("is-vegetarian-detail", recipe.esVegetariano, "Vegetariano", "No vegetariano")
    updateDietInfo("is-vegan-detail", recipe.esVegano, "Vegano", "No vegano")

    // Actualizar categorías
    const categoriesContainer = document.getElementById("categories-container")
    if (categoriesContainer) {
      categoriesContainer.innerHTML = ""
      console.log("Actualizando categorías:", recipe.categorias.length)

      recipe.categorias.forEach((categoria) => {
        // Añadir badge de categoría
        const badge = document.createElement("span")
        badge.className = "category-badge"
        badge.textContent = categoria.nombre
        badge.title = categoria.descripcion
        categoriesContainer.appendChild(badge)
      })
    } else {
      console.error("Elemento 'categories-container' no encontrado")
    }

    const categoriesDetail = document.getElementById("categories-detail")
    if (categoriesDetail) {
      categoriesDetail.innerHTML = ""

      recipe.categorias.forEach((categoria) => {
        // Añadir detalle de categoría
        const categoryDetail = document.createElement("div")
        categoryDetail.className = "category-detail-item"
        categoryDetail.innerHTML = `
          <h5>${categoria.nombre}</h5>
          <p>${categoria.descripcion}</p>
        `
        categoriesDetail.appendChild(categoryDetail)
      })
    } else {
      console.error("Elemento 'categories-detail' no encontrado")
    }

    // Actualizar ingredientes
    const ingredientsContainer = document.getElementById("ingredients-container")
    if (ingredientsContainer) {
      ingredientsContainer.innerHTML = ""
      console.log("Actualizando ingredientes:", recipe.ingredientes.length)

      recipe.ingredientes.forEach((ingrediente) => {
        const ingredientEl = document.createElement("div")
        ingredientEl.className = "ingredient-item"

        // Determinar el icono según el origen
        let iconClass = "fa-question"
        if (ingrediente.origen.nombre === "Vegetal") iconClass = "fa-carrot"
        else if (ingrediente.origen.nombre === "Fruta") iconClass = "fa-apple-whole"
        else if (ingrediente.origen.nombre === "Lácteo") iconClass = "fa-cheese"
        else if (ingrediente.origen.nombre === "Cárnico") iconClass = "fa-drumstick-bite"
        else if (ingrediente.origen.nombre === "Pescado") iconClass = "fa-fish"
        else if (ingrediente.origen.nombre === "Cereal") iconClass = "fa-bread-slice"
        else if (ingrediente.origen.nombre === "Condimento") iconClass = "fa-pepper-hot"
        else if (ingrediente.origen.nombre === "Animal") iconClass = "fa-egg"

        ingredientEl.innerHTML = `
          <div class="ingredient-icon">
            <i class="fas ${iconClass}"></i>
          </div>
          <div class="ingredient-info">
            <h5>${ingrediente.nombre}</h5>
            <span class="ingredient-origin">${ingrediente.origen.nombre}: ${ingrediente.origen.descripcion}</span>
          </div>
        `

        ingredientsContainer.appendChild(ingredientEl)
      })
    } else {
      console.error("Elemento 'ingredients-container' no encontrado")
    }

    // Actualizar pasos de preparación
    const stepsContainer = document.getElementById("preparation-steps")
    if (stepsContainer) {
      stepsContainer.innerHTML = ""
      console.log("Actualizando pasos:", recipe.pasos.length)

      recipe.pasos.forEach((paso, index) => {
        const stepEl = document.createElement("div")
        stepEl.className = "preparation-step"
        stepEl.innerHTML = `<p>${paso}</p>`
        stepsContainer.appendChild(stepEl)
      })
    } else {
      console.error("Elemento 'preparation-steps' no encontrado")
    }

    // Cargar recetas relacionadas (simulado)
    loadRelatedRecipes(recipe.categorias.map((cat) => cat.nombre))

    console.log("UI actualizada correctamente")
  } catch (error) {
    console.error("Error al actualizar la UI:", error)
    showErrorMessage("Ha ocurrido un error al mostrar la receta. Por favor, intenta de nuevo más tarde.")
  }
}

// Función para actualizar la información dietética
function updateDietInfo(elementId, isTrue, trueText, falseText) {
  const element = document.getElementById(elementId)
  if (element) {
    if (isTrue) {
      element.classList.remove("diet-no")
      const spanElement = element.querySelector("span")
      if (spanElement) {
        spanElement.textContent = trueText
      }
    } else {
      element.classList.add("diet-no")
      const spanElement = element.querySelector("span")
      if (spanElement) {
        spanElement.textContent = falseText
      }
    }
  } else {
    console.error(`Elemento '${elementId}' no encontrado`)
  }
}

// Función para cargar recetas relacionadas
function loadRelatedRecipes(categories) {
  const relatedRecipesContainer = document.getElementById("related-recipes")
  if (!relatedRecipesContainer) {
    console.error("Elemento 'related-recipes' no encontrado")
    return
  }

  // Simulamos recetas relacionadas basadas en las categorías
  const relatedRecipes = [
    {
      id: 2,
      nombre: "Pasta Primavera",
      foto: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBhc3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      nombre: "Lasaña Clásica",
      foto: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhc2FnbmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      nombre: "Ñoquis con Salsa de Queso",
      foto: "https://images.unsplash.com/photo-1589227365533-cee630bd59bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z25vY2NoaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ]

  console.log("Cargando recetas relacionadas:", relatedRecipes.length)
  relatedRecipesContainer.innerHTML = ""

  relatedRecipes.forEach((recipe) => {
    const recipeEl = document.createElement("a")
    recipeEl.href = `verReceta.html?id=${recipe.id}`
    recipeEl.className = "related-recipe"
    recipeEl.innerHTML = `
      <img src="${recipe.foto}" alt="${recipe.nombre}">
      <span>${recipe.nombre}</span>
    `
    relatedRecipesContainer.appendChild(recipeEl)
  })
}

// Configurar eventos de la página
function setupEventListeners() {
  console.log("Configurando event listeners")

  // Botón de favoritos
  const btnFavorite = document.getElementById("btn-favorite")
  if (btnFavorite) {
    btnFavorite.addEventListener("click", function () {
      this.classList.toggle("active")
      const isFavorite = this.classList.contains("active")

      if (isFavorite) {
        this.innerHTML = `<i class="fas fa-heart"></i> Guardado`
        showToast("Receta añadida a favoritos")
      } else {
        this.innerHTML = `<i class="far fa-heart"></i> Guardar`
        showToast("Receta eliminada de favoritos")
      }
    })
  } else {
    console.error("Elemento 'btn-favorite' no encontrado")
  }

  // Botón de compartir
  const btnShare = document.querySelector(".btn-share")
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      if (navigator.share) {
        navigator
          .share({
            title: document.getElementById("recipe-title").textContent,
            url: window.location.href,
          })
          .then(() => console.log("Contenido compartido exitosamente"))
          .catch((error) => console.log("Error al compartir:", error))
      } else {
        // Fallback para navegadores que no soportan Web Share API
        showToast("Copia este enlace para compartir: " + window.location.href)
      }
    })
  } else {
    console.error("Elemento '.btn-share' no encontrado")
  }

  // Botón de imprimir
  const btnPrint = document.querySelector(".btn-print")
  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      window.print()
    })
  } else {
    console.error("Elemento '.btn-print' no encontrado")
  }

  // Estrellas de valoración
  const ratingStars = document.querySelectorAll(".rating-select i")
  ratingStars.forEach((star, index) => {
    star.addEventListener("click", () => {
      // Resetear todas las estrellas
      ratingStars.forEach((s) => {
        s.className = "far fa-star"
      })

      // Activar las estrellas hasta la seleccionada
      for (let i = 0; i <= index; i++) {
        ratingStars[i].className = "fas fa-star active"
      }
    })
  })
}

// Función para mostrar toast (mensaje de notificación)
function showToast(message) {
  try {
    console.log("Mostrando toast:", message)

    // Crear elemento toast
    const toastContainer = document.createElement("div")
    toastContainer.className = "position-fixed bottom-0 end-0 p-3"
    toastContainer.style.zIndex = "11"

    const toastElement = document.createElement("div")
    toastElement.className = "toast"
    toastElement.setAttribute("role", "alert")
    toastElement.setAttribute("aria-live", "assertive")
    toastElement.setAttribute("aria-atomic", "true")

    toastElement.innerHTML = `
      <div class="toast-header">
        <strong class="me-auto">FoodMatch</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `

    toastContainer.appendChild(toastElement)
    document.body.appendChild(toastContainer)

    // Verificar si Bootstrap está disponible
    let bootstrap
    if (typeof bootstrap === "undefined") {
      bootstrap = window.bootstrap
    }

    if (bootstrap && bootstrap.Toast) {
      // Inicializar y mostrar el toast con Bootstrap
      const bsToast = new bootstrap.Toast(toastElement)
      bsToast.show()

      // Eliminar el toast después de que se oculte
      toastElement.addEventListener("hidden.bs.toast", () => {
        document.body.removeChild(toastContainer)
      })
    } else {
      console.warn("Bootstrap no está disponible, mostrando toast alternativo")

      // Alternativa simple si Bootstrap no está disponible
      toastElement.style.display = "block"
      toastElement.style.backgroundColor = "#fff"
      toastElement.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.15)"
      toastElement.style.margin = "0.5rem"

      // Eliminar después de 3 segundos
      setTimeout(() => {
        if (document.body.contains(toastContainer)) {
          document.body.removeChild(toastContainer)
        }
      }, 3000)
    }
  } catch (error) {
    console.error("Error al mostrar el toast:", error)
  }
}
