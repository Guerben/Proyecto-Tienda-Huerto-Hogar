const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Aseguro que usuarios sea siempre un array
    if (!Array.isArray(usuarios)) {
        usuarios = [usuarios];
    }

    const validuser = usuarios.find(u => u.email === email && u.password === password);

    if (!validuser) {
        alert('Correo y/o contraseña incorrecta!');
        return;
    }

    // Guardo solo el usuario logueado en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(validuser));
    alert('Login exitoso!');
    alert(`Bienvenido ${validuser.nombre}!`);
    window.location.href = 'index.html';
});

// Logout (esto debe ir en el archivo donde tengas el botón de logout)
const logoutBtn = document.querySelector('#logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuarioActual');
        window.location.href = 'login.html';
    });
}