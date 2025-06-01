

async function obtenerUsuario() {
    const userId = localStorage.getItem("idUsuario");
    if (!userId) {
        console.error("No se encontró el idUsuario en localStorage.");
        return null;
    }

    try {
        // Realiza la solicitud a la API para obtener los datos del usuario
        const response = await axios.get(`/api/usuarios/${userId}`);
        return response.data; // Devuelve los datos del usuario
    } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const userData = await obtenerUsuario();
    if (!userData) return;

    // Llena los campos del formulario con los datos del usuario
    document.getElementById("first-name").value = userData.nombre || "";
    document.getElementById("last-name").value = userData.apellido || "";
    document.getElementById("age").value = userData.edad || "";
    document.getElementById("phone").value = userData.telefono || "";
    document.getElementById("email").value = userData.email || "";
    document.getElementById("username").value = userData.username || "";
});

async function actualizarUsuario() {
    const userId = localStorage.getItem("idUsuario");
    if (!userId) {
        console.error("No se encontró el idUsuario en localStorage.");
        return;
    }

    // Obtén los datos del formulario
    const userData = {
        nombre: document.getElementById("first-name").value,
        apellido: document.getElementById("last-name").value,
        edad: document.getElementById("age").value,
        telefono: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value
    };

    try {
        // Realiza la solicitud PUT a la API
        const response = await axios.put(`/api/usuarios/${userId}`, userData);
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Usuario actualizado correctamente.'
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el usuario.'
        });
    }
}

// Evento para el botón de guardar cambios
document.getElementById("edit-profile-btn").addEventListener("click", async (event) => {
    const button = event.target;
    const isEditing = button.textContent === "Editar Perfil";

    if (isEditing) {
        // Habilitar edición de los campos
        document.getElementById("first-name").removeAttribute("readonly");
        document.getElementById("last-name").removeAttribute("readonly");
        document.getElementById("age").removeAttribute("readonly");
        document.getElementById("phone").removeAttribute("readonly");
        document.getElementById("email").removeAttribute("readonly");
        document.getElementById("username").removeAttribute("readonly");

        // Cambiar texto del botón
        button.textContent = "Guardar Cambios";
    } else {
        // Guardar cambios
        await actualizarUsuario();

        // Deshabilitar edición de los campos
        document.getElementById("first-name").setAttribute("readonly", true);
        document.getElementById("last-name").setAttribute("readonly", true);
        document.getElementById("age").setAttribute("readonly", true);
        document.getElementById("phone").setAttribute("readonly", true);
        document.getElementById("email").setAttribute("readonly", true);
        document.getElementById("username").setAttribute("readonly", true);

        // Cambiar texto del botón
        button.textContent = "Editar Perfil";
    }
});