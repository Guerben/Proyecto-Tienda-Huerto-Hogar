
    const signupForm = document.querySelector('#signupForm');
    signupForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        const nombre = document.querySelector('#nombre').value
        const email = document.querySelector('#email').value
        const password = document.querySelector('#password').value
        const region = document.querySelector('#region').value
        const comuna = document.querySelector('#comuna').value

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const isUserRegistered = usuarios.find((user) => user.email === email);
        if (isUserRegistered) {
            return alert('El correo ya está registrado');  
        }

        usuarios.push({name: nombre, email: email, password: password, region: region, comuna: comuna})
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
        alert('Registro exitoso!')
        // redireccion al login
        window.location.href = 'login.html'
    })