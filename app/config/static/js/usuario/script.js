const isLoggedIn = false; // cambiar por logica de manejo de sesion


document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, 
                behavior: 'smooth'
            });
        }
    });
});


function restrictAccess(url) {
    if (!isLoggedIn) {
        alert('Por favor, inicia sesión para continuar.');
        window.location.href = 'login.html';
    } else {
        window.location.href = url;
    }
}


function restrictBookmark(recipeId) {
    if (!isLoggedIn) {
        alert('Por favor, inicia sesión para guardar la receta.');
        window.location.href = 'login.html';
    } else {
      //  (e.g., API call)
        console.log(`Bookmarking recipe: ${recipeId}`);
        alert(`Receta ${recipeId} guardada!`); // Temporary feedback
    }
}