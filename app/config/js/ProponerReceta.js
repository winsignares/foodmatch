document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const addRecipeForm = document.getElementById('add-recipe-form');
    const recipeTitle = document.getElementById('recipe-title');
    const recipeDescription = document.getElementById('recipe-description');
    const recipeIngredients = document.getElementById('recipe-ingredients');
    const recipeTags = document.getElementById('recipe-tags');
    const recipeSteps = document.getElementById('recipe-steps');
    const recipeImage = document.getElementById('recipe-image');
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    const addTagBtn = document.getElementById('add-tag-btn');
    const ingredientTagsContainer = document.getElementById('ingredient-tags-container');
    const tagsContainer = document.getElementById('tags-container');
    const imagePreview = document.getElementById('image-preview');
    
    // API URL base - Cambiar según la configuración del backend
    const API_BASE_URL = '/api';
    
    // Función para añadir ingredientes
    addIngredientBtn.addEventListener('click', function() {
        const ingredientText = recipeIngredients.value.trim();
        
        if (ingredientText) {
            // Crear etiqueta de ingrediente
            const ingredientTag = document.createElement('span');
            ingredientTag.className = 'badge ingredient-tag';
            ingredientTag.innerHTML = `${ingredientText} <i class="fas fa-times remove-tag"></i>`;
            
            // Añadir evento para eliminar la etiqueta
            const removeIcon = ingredientTag.querySelector('.remove-tag');
            removeIcon.addEventListener('click', function() {
                ingredientTag.remove();
            });
            
            // Añadir al contenedor
            ingredientTagsContainer.appendChild(ingredientTag);
            
            // Limpiar el campo de entrada
            recipeIngredients.value = '';
            recipeIngredients.focus();
        }
    });
    
    // Función para añadir etiquetas
    addTagBtn.addEventListener('click', function() {
        const tagText = recipeTags.value.trim();
        
        if (tagText) {
            // Crear etiqueta
            const tag = document.createElement('span');
            tag.className = 'badge tag';
            tag.innerHTML = `${tagText} <i class="fas fa-times remove-tag"></i>`;
            
            // Añadir evento para eliminar la etiqueta
            const removeIcon = tag.querySelector('.remove-tag');
            removeIcon.addEventListener('click', function() {
                tag.remove();
            });
            
            // Añadir al contenedor
            tagsContainer.appendChild(tag);
            
            // Limpiar el campo de entrada
            recipeTags.value = '';
            recipeTags.focus();
        }
    });
    
    // Manejar la subida de imágenes
    recipeImage.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Crear vista previa de la imagen
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Limpiar vista previa anterior
                imagePreview.innerHTML = '';
                
                // Crear elemento de vista previa
                const previewItem = document.createElement('div');
                previewItem.className = 'image-preview-item';
                
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" class="image-preview-thumbnail" />
                    <span class="image-name">${file.name}</span>
                    <button type="button" class="btn btn-sm btn-link text-danger remove-image">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                // Añadir evento para eliminar la imagen
                const removeButton = previewItem.querySelector('.remove-image');
                removeButton.addEventListener('click', function() {
                    previewItem.remove();
                    recipeImage.value = '';
                });
                
                // Añadir al contenedor
                imagePreview.appendChild(previewItem);
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Eliminar etiquetas existentes
    document.querySelectorAll('.remove-tag').forEach(function(removeIcon) {
        removeIcon.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // Eliminar imagen existente
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
            ingredients.push(tag.textContent.trim());
        });
        
        // Recopilar etiquetas
        const tags = [];
        tagsContainer.querySelectorAll('.tag').forEach(function(tag) {
            tags.push(tag.textContent.trim());
        });
        
        // Verificar que hay al menos un ingrediente y una etiqueta
        if (ingredients.length === 0) {
            alert('Por favor, añade al menos un ingrediente.');
            return;
        }
        
        if (tags.length === 0) {
            alert('Por favor, añade al menos una etiqueta.');
            return;
        }
        
        // Crear objeto FormData para enviar al servidor
        const formData = new FormData();
        formData.append('title', recipeTitle.value);
        formData.append('description', recipeDescription.value);
        formData.append('steps', recipeSteps.value);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('tags', JSON.stringify(tags));
        
        // Añadir imagen si existe
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
            
            // Redireccionar a la página principal o de favoritos
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
    
    // Permitir presionar Enter para añadir etiquetas
    recipeTags.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTagBtn.click();
        }
    });
});