if(!localStorage.getItem("idUsuario")) {
    window.location.href = "/login";
}

function CerrarSesion() {
    localStorage.removeItem("idUsuario");
    window.location.href = "/";
}