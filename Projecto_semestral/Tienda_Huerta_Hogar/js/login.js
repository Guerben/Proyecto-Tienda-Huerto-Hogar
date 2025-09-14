// login.js - handle login and logout, set lightweight session flag
const loginForm = document.querySelector('#loginForm')
if(loginForm){
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    // read and normalize 'usuarios' from localStorage - ensure it's an array
    var usuarios = [];
    try{
      var raw = localStorage.getItem('usuarios');
      if(raw){
        var parsed = JSON.parse(raw);
        if(Array.isArray(parsed)) usuarios = parsed;
        else if(parsed && typeof parsed === 'object') usuarios = [parsed];
        // otherwise leave usuarios as empty array
      }
    }catch(err){
      usuarios = [];
    }

    const validuser = usuarios.find(u => u && u.email === email && u.password === password)

    if(!validuser) {
      alert('correo y/o contraseña incorrecta!')
      return
    }

    // store a lightweight session flag used by auth.js
    try{
      const publicUser = { email: validuser.email, nombre: validuser.nombre || '' }
      localStorage.setItem('user', JSON.stringify(publicUser))
    }catch(e){}

    alert('Login exitoso!')
    if(validuser.nombre) alert(`Bienvenido ${validuser.nombre}!`)
    window.location.href = 'index.html'
  })
}

const logoutBtn = document.querySelector('#logoutBtn')
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    // remove session flags
    try{ localStorage.removeItem('usuarios'); }catch(e){}
    try{ localStorage.removeItem('user'); sessionStorage.removeItem('user'); }catch(e){}
    // Redirect to login
    window.location.href = 'login.html'
  })
}