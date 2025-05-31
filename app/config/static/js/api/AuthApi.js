function comprobarContraseniasCoinciden(password, confirmPassword) {
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.'
        });
        return false;
    }
    return true;
}

async function registrarUsuario(event) {
    event.preventDefault();

    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    const contraseniasCoinciden = comprobarContraseniasCoinciden(password, confirmPassword);
    if (!contraseniasCoinciden) return;

    const datosUsuario = {
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        edad: parseInt(document.getElementById('edad').value, 10),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('correo').value.trim(),
        username: document.getElementById('usuario').value.trim(),
        contrasenia: password
    };

    try {
        const response = await axios.post(`/api/usuarios/`, datosUsuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/login';
            });
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error.response?.data || error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo registrar el usuario. Por favor, inténtalo de nuevo.'
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('registerBtn');
    if (btn) {
        btn.addEventListener('click', registrarUsuario);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnLogin');
    if (btn) {
        btn.addEventListener('click', login);
    }
});
async function login(event){
    event.preventDefault()

    const datosLogin = {
        username: document.getElementById('username').value.trim(),
        contrasenia: document.getElementById('password').value.trim()
    }

    try {
        const response = await axios.post(`/api/usuarios/iniciar-sesion`, datosLogin, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if( response.status === 200 ){
            localStorage.setItem("idUsuario", response.data.id);
            if(response.data.id_rol === 1){
                window.location.href = '/admin/panel';
            }else{
                window.location.href = '/panel';
            }

        }


    }catch (error){
        console.log(error)
         Swal.fire({
            icon: 'error',
            title: ':(',
            text: 'Username o contraseña incorrectos.'
        });
    }
}
