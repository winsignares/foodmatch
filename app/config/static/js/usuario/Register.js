import UserApi from "{{ url_for('static', filename='js/api/UserApi.js') }}"

const userApi = new UserApi();

async function agregarUsuario(){

 const datosUsuario = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        edad: parseInt(document.getElementById('edad').value, 10),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('correo').value.trim(),
        username: document.getElementById('usuario').value.trim(),
        contrasenia: document.getElementById('password').value.trim()
    };

  try {
      console.log(datosUsuario)
        const response = await userApi.registrarUsuario(datosUsuario);
        console.log('Usuario registrado:', response);
        alert('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        alert('Error al registrar usuario');
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('registerBtn');
    if (btn) {
        btn.addEventListener('click', agregarUsuario);
    }
});