document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const addRecipeForm = document.getElementById('add-recipe-form');
    const recipeTitle = document.getElementById('recipe-title');
    const recipeIngredients = document.getElementById('recipe-ingredients');
    const recipeCategories = document.getElementById('recipe-categories'); // Corregido el error tipográfico
    const recipeSteps = document.getElementById('recipe-steps');
    const recipeImage = document.getElementById('recipe-image');
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const ingredientTagsContainer = document.getElementById('ingredient-tags-container');
    const tagsContainer = document.getElementById('tags-container');
    const imagePreview = document.getElementById('image-preview');
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
    
    // API URL base
    const API_BASE_URL = '/api';
    
    // Función para añadir ingredientes
    addIngredientBtn.addEventListener('click', function() {
        const ingredientText = recipeIngredients.value.trim();
        if (ingredientText) {
            const ingredientTag = document.createElement('span');
            ingredientTag.className = 'badge ingredient-tag';
            ingredientTag.innerHTML = `${ingredientText} <i class="fas fa-times remove-tag"></i>`;
            const removeIcon = ingredientTag.querySelector('.remove-tag');
            removeIcon.addEventListener('click', function() {
                ingredientTag.remove();
            });
            ingredientTagsContainer.appendChild(ingredientTag);
            recipeIngredients.value = '';
            recipeIngredients.focus();
        }
    });
    
    // Función para añadir categorías desde el select
    recipeCategories.addEventListener('change', function() {
        const categoryText = recipeCategories.value;
        if (categoryText) {
            // Crear etiqueta
            const tag = document.createElement('span');
            tag.className = 'badge tag';
            tag.innerHTML = `${categoryText} <i class="fas fa-times remove-tag"></i>`;
            
            // Añadir evento para eliminar la categoría
            const removeIcon = tag.querySelector('.remove-tag');
            removeIcon.addEventListener('click', function() {
                tag.remove();
                // Re-habilitar la opción en el select
                const option = recipeCategories.querySelector(`option[value="${categoryText}"]`);
                if (option) {
                    option.disabled = false;
                }
            });
            
            // Añadir al contenedor
            tagsContainer.appendChild(tag);
            
            // Deshabilitar la opción seleccionada para evitar duplicados
            const selectedOption = recipeCategories.querySelector(`option[value="${categoryText}"]`);
            selectedOption.disabled = true;
            
            // Resetear el select
            recipeCategories.value = '';
            recipeCategories.focus();
        }
    });
    
    // Manejar la subida de imágenes
    recipeImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = '';
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" class="image-preview-thumbnail" />
                    <span class="image-name">${file.name}</span>
                    <button type="button" class="btn btn-sm btn-link text-danger remove-image">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                const removeButton = previewItem.querySelector('.remove-image');
                removeButton.addEventListener('click', function() {
                    previewItem.remove();
                    recipeImage.value = '';
                });
                imagePreview.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Eliminar etiquetas existentes al cargar la página
    document.querySelectorAll('.remove-tag').forEach(function(removeIcon) {
        removeIcon.addEventListener('click', function() {
            const tag = this.parentElement;
            const categoryText = tag.textContent.trim().replace('×', '');
            tag.remove();
            // Re-habilitar la opción en el select si es una categoría
            const option = recipeCategories.querySelector(`option[value="${categoryText}"]`);
            if (option) {
                option.disabled = false;
            }
        });
    });
    
    // Eliminar imagen existente al cargar la página
    document.querySelectorAll('.remove-image').forEach(function(removeButton) {
        removeButton.addEventListener('click', function() {
            this.closest('.image-preview-item').remove();
            recipeImage.value = '';
        });
    });
    
    // Validación del formulario y envío
    addRecipeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar el formulario
        if (!addRecipeForm.checkValidity()) {
            e.stopPropagation();
            addRecipeForm.classList.add('was-validated');
            return;
        }
        
        // Recopilar ingredientes
        const ingredients = [];
        ingredientTagsContainer.querySelectorAll('.ingredient-tag').forEach(function(tag) {
            ingredients.push(tag.textContent.trim().replace('×', '')); // Eliminar el ícono ×
        });
        
        // Recopilar categorías
        const categories = [];
        tagsContainer.querySelectorAll('.tag').forEach(function(tag) {
            categories.push(tag.textContent.trim().replace('×', '')); // Eliminar el ícono ×
        });
        
        // Verificar que hay al menos un ingrediente y una categoría
        if (ingredients.length === 0) {
            alert('Por favor, añade al menos un ingrediente.');
            return;
        }
        
        if (categories.length === 0) {
            alert('Por favor, añade al menos una categoría.');
            return;
        }
        
        // Crear objeto FormData para enviar al servidor
        const formData = new FormData();
        formData.append('title', recipeTitle.value);
        formData.append('steps', recipeSteps.value);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('categories', JSON.stringify(categories));
        if (recipeImage.files.length > 0) {
            formData.append('image', recipeImage.files[0]);
        }
        
        try {
            // Mostrar indicador de carga
            const submitBtn = addRecipeForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            
            // Enviar datos al servidor
            const response = await fetch(`${API_BASE_URL}/recipes/add`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Mostrar mensaje de éxito
            alert('¡Receta enviada con éxito!');
            
            // Redireccionar a la página principal
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            console.error('Error al enviar la receta:', error);
            alert('Ha ocurrido un error al enviar la receta. Por favor, intenta de nuevo más tarde.');
        } finally {
            // Restaurar el botón
            const submitBtn = addRecipeForm.querySelector('.btn-submit');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Propuesta';
        }
    });
    
    // Permitir presionar Enter para añadir ingredientes
    recipeIngredients.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addIngredientBtn.click();
        }
    });
});