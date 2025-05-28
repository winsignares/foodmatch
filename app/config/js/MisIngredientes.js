document.addEventListener("DOMContentLoaded", () => {
    
    const ingredientsGrid = document.getElementById("ingredients-grid")
    const loadingIngredients = document.getElementById("loading-ingredients")
    const noIngredientsMessage = document.getElementById("no-ingredients-message")
    const errorIngredientsMessage = document.getElementById("error-ingredients-message")
    const ingredientCardTemplate = document.getElementById("ingredient-card-template")
    const searchIngredient = document.getElementById("search-ingredient")
    const searchIngredientButton = document.getElementById("search-ingredient-button")
    const originFilter = document.getElementById("origin-filter")
  

    const addIngredientForm = document.getElementById("add-ingredient-form")
    const ingredientName = document.getElementById("ingredient-name")
    const ingredientOrigin = document.getElementById("ingredient-origin")
    const ingredientIcon = document.getElementById("ingredient-icon")
    const saveIngredientBtn = document.getElementById("save-ingredient-btn")
  
    const editIngredientForm = document.getElementById("edit-ingredient-form")
    const editIngredientId = document.getElementById("edit-ingredient-id")
    const editIngredientName = document.getElementById("edit-ingredient-name")
    const editIngredientOrigin = document.getElementById("edit-ingredient-origin")
    const editIngredientIcon = document.getElementById("edit-ingredient-icon")
    const updateIngredientBtn = document.getElementById("update-ingredient-btn")
  
    const deleteIngredientId = document.getElementById("delete-ingredient-id")
    const deleteIngredientName = document.getElementById("delete-ingredient-name")
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn")
  
    // API URL base - Cambiar según la configuración del backend
    const API_BASE_URL = "/api"
  
    // Datos de ejemplo para ingredientes (simulando base de datos)
    let userIngredients = [
      {
        id: 1,
        name: "Tomate",
        origin: "Vegetal",
        icon: "fa-apple-whole",
      },
      {
        id: 2,
        name: "Cebolla",
        origin: "Vegetal",
        icon: "fa-carrot",
      },
      {
        id: 3,
        name: "Ajo",
        origin: "Condimento",
        icon: "fa-seedling",
      },
      {
        id: 4,
        name: "Pimiento",
        origin: "Vegetal",
        icon: "fa-pepper-hot",
      },
      {
        id: 5,
        name: "Pollo",
        origin: "Cárnico",
        icon: "fa-drumstick-bite",
      },
      {
        id: 6,
        name: "Queso",
        origin: "Lácteo",
        icon: "fa-cheese",
      },
      {
        id: 7,
        name: "Huevos",
        origin: "Otro",
        icon: "fa-egg",
      },
      {
        id: 8,
        name: "Pan",
        origin: "Cereal",
        icon: "fa-bread-slice",
      },
      {
        id: 9,
        name: "Sal",
        origin: "Condimento",
        icon: "",
      },
    ]
  
    // Variable para almacenar los ingredientes filtrados
    let filteredIngredients = [...userIngredients]
  
    // Cargar ingredientes del usuario
    function loadUserIngredients() {
      
      loadingIngredients.classList.remove("d-none")
      noIngredientsMessage.classList.add("d-none")
      errorIngredientsMessage.classList.add("d-none")
  
      
      setTimeout(() => {
        
        loadingIngredients.classList.add("d-none")
  
       
        ingredientsGrid.innerHTML = ""
  
        // Renderizar ingredientes
        if (filteredIngredients.length > 0) {
          filteredIngredients.forEach((ingredient) => {
            const ingredientCard = document.importNode(ingredientCardTemplate.content, true)
  
            // Establecer datos del ingrediente
            const iconElement = ingredientCard.querySelector(".ingredient-icon i")
  
            // Si no hay icono, mostrar un texto con la primera letra del ingrediente
            if (!ingredient.icon) {
              iconElement.className = ""
              iconElement.textContent = ingredient.name.charAt(0).toUpperCase()
              iconElement.style.fontWeight = "bold"
              iconElement.style.fontSize = "2.5rem"
            } else {
              iconElement.className = `fas ${ingredient.icon}`
            }
  
            ingredientCard.querySelector(".ingredient-name").textContent = ingredient.name
            ingredientCard.querySelector(".ingredient-origin").textContent = `Categoría: ${ingredient.origin}`
  
            // Añadir ID del ingrediente para editar/eliminar
            const card = ingredientCard.querySelector(".ingredient-card")
            card.dataset.id = ingredient.id
  
            // Configurar botones de acción
            const editButton = ingredientCard.querySelector(".btn-edit-ingredient")
            editButton.addEventListener("click", () => {
              openEditModal(ingredient)
            })
  
            const deleteButton = ingredientCard.querySelector(".btn-delete-ingredient")
            deleteButton.addEventListener("click", () => {
              openDeleteModal(ingredient)
            })
  
            // Añadir la tarjeta al contenedor
            ingredientsGrid.appendChild(ingredientCard)
          })
        } else {
          // Mostrar mensaje si no hay ingredientes
          noIngredientsMessage.classList.remove("d-none")
        }
      }, 800) // Simular 0.8 segundos de carga
    }
  
    // Filtrar ingredientes
    function filterIngredients() {
      const searchTerm = searchIngredient.value.trim().toLowerCase()
      const originValue = originFilter.value
  
      filteredIngredients = userIngredients.filter((ingredient) => {
        const nameMatch = ingredient.name.toLowerCase().includes(searchTerm)
        const originMatch = !originValue || ingredient.origin === originValue
        return nameMatch && originMatch
      })
  
      loadUserIngredients()
    }
  
    // Abrir modal de edición
    function openEditModal(ingredient) {
      editIngredientId.value = ingredient.id
      editIngredientName.value = ingredient.name
      editIngredientOrigin.value = ingredient.origin
      editIngredientIcon.value = ingredient.icon || ""
  
      // Mostrar el modal (Bootstrap lo maneja automáticamente con data-bs-target)
    }
  
    // Abrir modal de eliminación
    function openDeleteModal(ingredient) {
      deleteIngredientId.value = ingredient.id
      deleteIngredientName.textContent = ingredient.name
  
      // Mostrar el modal manualmente
      const deleteModal = new bootstrap.Modal(document.getElementById("deleteIngredientModal"))
      deleteModal.show()
    }
  
    // Guardar nuevo ingrediente
    function saveIngredient() {
      // Validar el formulario
      if (!addIngredientForm.checkValidity()) {
        addIngredientForm.classList.add("was-validated")
        return
      }
  
      // Crear nuevo ingrediente
      const newIngredient = {
        id: userIngredients.length > 0 ? Math.max(...userIngredients.map((i) => i.id)) + 1 : 1,
        name: ingredientName.value.trim(),
        origin: ingredientOrigin.value,
        icon: ingredientIcon.value,
      }
  
      // Añadir a la lista de ingredientes
      userIngredients.push(newIngredient)
      filteredIngredients = [...userIngredients]
  
      // Cerrar el modal
      const addModal = bootstrap.Modal.getInstance(document.getElementById("addIngredientModal"))
      addModal.hide()
  
      // Limpiar el formulario
      addIngredientForm.reset()
      addIngredientForm.classList.remove("was-validated")
  
      // Recargar la lista de ingredientes
      loadUserIngredients()
  
      // Mostrar mensaje de éxito
      showToast("Ingrediente añadido correctamente")
    }
  
    // Actualizar ingrediente existente
    function updateIngredient() {
      // Validar el formulario
      if (!editIngredientForm.checkValidity()) {
        editIngredientForm.classList.add("was-validated")
        return
      }
  
      const id = Number.parseInt(editIngredientId.value)
      const ingredientIndex = userIngredients.findIndex((i) => i.id === id)
  
      if (ingredientIndex !== -1) {
        // Actualizar ingrediente
        userIngredients[ingredientIndex] = {
          ...userIngredients[ingredientIndex],
          name: editIngredientName.value.trim(),
          origin: editIngredientOrigin.value,
          icon: editIngredientIcon.value,
        }
  
        // Actualizar ingredientes filtrados
        filteredIngredients = filteredIngredients.map((i) => (i.id === id ? userIngredients[ingredientIndex] : i))
  
        // Cerrar el modal
        const editModal = bootstrap.Modal.getInstance(document.getElementById("editIngredientModal"))
        editModal.hide()
  
        // Limpiar el formulario
        editIngredientForm.classList.remove("was-validated")
  
        // Recargar la lista de ingredientes
        loadUserIngredients()
  
        // Mostrar mensaje de éxito
        showToast("Ingrediente actualizado correctamente")
      }
    }
  
    // Eliminar ingrediente
    function deleteIngredient() {
      const id = Number.parseInt(deleteIngredientId.value)
  
      // Eliminar de la lista de ingredientes
      userIngredients = userIngredients.filter((i) => i.id !== id)
      filteredIngredients = filteredIngredients.filter((i) => i.id !== id)
  
      // Cerrar el modal
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteIngredientModal"))
      deleteModal.hide()
  
      // Recargar la lista de ingredientes
      loadUserIngredients()
  
      // Mostrar mensaje de éxito
      showToast("Ingrediente eliminado correctamente")
    }
  
    // Función para mostrar toast (mensaje de notificación)
    function showToast(message) {
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
  
      // Inicializar y mostrar el toast
      const toast = new bootstrap.Toast(toastElement)
      toast.show()
  
      // Eliminar el toast después de que se oculte
      toastElement.addEventListener("hidden.bs.toast", () => {
        document.body.removeChild(toastContainer)
      })
    }
  
    // Event Listeners
  
    // Búsqueda de ingredientes
    searchIngredientButton.addEventListener("click", filterIngredients)
  
    // Permitir búsqueda con Enter
    searchIngredient.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        filterIngredients()
      }
    })
  
    // Filtrar por origen
    originFilter.addEventListener("change", filterIngredients)
  
    // Guardar nuevo ingrediente
    saveIngredientBtn.addEventListener("click", saveIngredient)
  
    // Actualizar ingrediente
    updateIngredientBtn.addEventListener("click", updateIngredient)
  
    // Eliminar ingrediente
    confirmDeleteBtn.addEventListener("click", deleteIngredient)
  
    // Cargar ingredientes al iniciar
    loadUserIngredients()
  
    // Initialize Bootstrap modals (moved to ensure Bootstrap is available)
    const addIngredientModalElement = document.getElementById("addIngredientModal")
    const editIngredientModalElement = document.getElementById("editIngredientModal")
    const deleteIngredientModalElement = document.getElementById("deleteIngredientModal")
  
    const addIngredientModal = new bootstrap.Modal(addIngredientModalElement)
    const editIngredientModal = new bootstrap.Modal(editIngredientModalElement)
    const deleteIngredientModal = new bootstrap.Modal(deleteIngredientModalElement)
  })
  