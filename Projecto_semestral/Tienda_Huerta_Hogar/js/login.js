const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const validuser = usuarios.find(usuarios=> usuarios.email === email && usuarios.password === password)

    function loginSuccess() {
        localStorage.setItem('usuarios', JSON.stringify(validuser))
    }

    const currentUser = JSON.parse(localStorage.getItem('usuarios'))
    if (currentUser) {
        const publicUser = {
            //nombre: validuser.nombre,
            email: validuser.email,
            password: validuser.password
        }
        localStorage.setItem('usuarios', JSON.stringify([publicUser]))
    }

    if(!validuser) {
        alert('correo y/o contraseña incorrecta!')
    } else {
        loginSuccess()
        alert('Login exitoso!')
        alert(`Bienvenido ${validuser.nombre}!`)
        window.location.href = 'index.html'
    }

const logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click', () => {
    // cierra el sesion  al usuario actual del localStorage
    localStorage.removeItem('usuarios')

    // Redirige al login
    window.location.href = 'login.html' 
})

})