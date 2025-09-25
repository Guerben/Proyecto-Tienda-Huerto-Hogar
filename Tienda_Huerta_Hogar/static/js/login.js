// ===== FUNCIONALIDAD DE LOGIN =====
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
    window.location.href = '/index.html';
});

// Logout
const logoutBtn = document.querySelector('#logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('usuarioActual');
        window.location.href = '/login.html';
    });
}

// ===== FUNCIONALIDAD DEL NAVBAR MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todos los tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializa todos los popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Cierra el navbar móvil al hacer clic en un enlace
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Solo cierra el menú móvil si está abierto, pero permite la navegación
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                // No previene el comportamiento por defecto del enlace
                // event.preventDefault() 
            });
        });

        // Cierra navbar al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarCollapse.contains(event.target);
            const isClickOnToggler = navbarToggler.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // ===== VALIDACIONES ADICIONALES DEL FORMULARIO =====
    
    // Valida en tiempo real del email
    const emailInput = document.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Por favor, ingresa un email válido');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
    }

    // Valida en tiempo real de la contraseña
    const passwordInput = document.querySelector('#password');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            const password = this.value;
            
            if (password && password.length < 6) {
                this.classList.add('is-invalid');
                showFieldError(this, 'La contraseña debe tener al menos 6 caracteres');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
    }
});

// ===== FUNCIONES AUXILIARES =====

// Muestra error en un campo
function showFieldError(field, message) {
    hideFieldError(field); // Limpiar errores previos
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Oculta error de un campo
function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// ===== FUNCIONALIDAD ADICIONAL =====

// Muestra/oculta contraseña
function togglePasswordVisibility() {
    const passwordInput = document.querySelector('#password');
    const toggleBtn = document.querySelector('#togglePassword');
    
    if (passwordInput && toggleBtn) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            toggleBtn.innerHTML = '<i class="fa fa-eye"></i>';
        }
    }
}

// Limpia formulario
function clearForm() {
    const form = document.querySelector('#loginForm');
    if (form) {
        form.reset();
        // Limpia clases de validación
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
        // Limpia mensajes de error
        const errorMessages = form.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(error => error.remove());
    }
}