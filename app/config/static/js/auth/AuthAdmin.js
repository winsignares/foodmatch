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

(async () => {
    const usuario = await obtenerUsuario();
    if (!usuario || usuario.id_rol !== 1) {
        window.location.href = "/acceso_denegado";
    }
})();

function CerrarSesion() {
    localStorage.removeItem("idUsuario");
    window.location.href = "/";
}