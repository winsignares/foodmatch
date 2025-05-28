
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('registerBtn');
    if (btn) {
        btn.addEventListener('click', registrarUsuario);
    }
});

function registrarUsuario() {
    const datosUsuario = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        edad: parseInt(document.getElementById('edad').value,10),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('correo').value.trim(),
        username: document.getElementById('usuario').value.trim(),
        contrasenia: document.getElementById('password').value.trim()
    };
    console.log(datosUsuario)
        try {
            const response = axios.post(`/api/usuarios/`, datosUsuario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error.response?.data || error.message);
            throw error;
        }
    }


