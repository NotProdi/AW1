document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que el formulario se envíe automáticamente

            const userName = document.getElementById('username').value;
            const userPass = document.getElementById('password').value;

            fetch('../data/user.json')
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error al cargar el archivo user.json');
                    }
                    return res.json();
                })
                .then(users => {
                    // Valida si existe un usuario con esas credenciales
                    const user = users.find(e => e.name === userName && e.pass === userPass);

                    if (user) {
                        // Si el usuario existe, almacena sus datos en sessionStorage
                        sessionStorage.setItem('userData', JSON.stringify(user));
                        console.log('Usuario autenticado:', user);

                        // Redirige al home
                        window.location.href = 'http://127.0.0.1:5500/pages/home.html';
                    } else {
                        // Muestra mensaje de error si las credenciales no coinciden
                        const lblError = document.getElementById('lblError');
                        if (lblError) {
                            lblError.textContent = "Error al ingresar los datos. Usuario o contraseña incorrectos.";
                            lblError.style.color = 'red';
                        }
                    }
                })
                .catch(error => {
                    console.error('Error al hacer fetch:', error);
                });
        });
    } else {
        console.error('Formulario con ID "login" no encontrado en el DOM.');
    }
});
