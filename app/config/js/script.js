// Script para manejar la funcionalidad de guardar recetas
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar todos los botones de guardar receta
  const bookmarkButtons = document.querySelectorAll('[aria-label="Guardar receta"]');
  
  // Añadir evento de clic a cada botón
  bookmarkButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Cambiar el color de fondo para indicar que se ha guardado
      this.classList.toggle('bg-warning');
      
      // Obtener el título de la receta
      const recipeTitle = this.closest('.card').querySelector('.card-title').textContent;
      
      // Mostrar mensaje de confirmación
      if (this.classList.contains('bg-warning')) {
        showToast(`¡${recipeTitle} añadida a favoritos!`);
      } else {
        showToast(`${recipeTitle} eliminada de favoritos`);
      }
    });
  });
  
  // Función para mostrar notificaciones toast
  function showToast(message) {
    // Crear elemento toast si no existe
    if (!document.getElementById('toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }
    
    // Crear el toast
    const toastId = 'toast-' + Date.now();
    const toastHTML = `
      <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">FoodMatch</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;
    
    // Añadir toast al contenedor
    document.getElementById('toast-container').innerHTML += toastHTML;
    
    // Inicializar y mostrar el toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Eliminar el toast después de que se oculte
    toastElement.addEventListener('hidden.bs.toast', function() {
      toastElement.remove();
    });
  }
  
  // Inicializar tooltips de Bootstrap
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Añadir funcionalidad de búsqueda básica
  const searchButton = document.querySelector('.btn-warning.btn-lg');
  if (searchButton) {
    searchButton.addEventListener('click', function(e) {
      // Prevenir navegación si no hay página de búsqueda aún
      if (!document.querySelector('buscar.html')) {
        e.preventDefault();
        showToast('Funcionalidad de búsqueda en desarrollo');
      }
    });
  }
});