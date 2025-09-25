document.addEventListener('DOMContentLoaded', function() {
    // ===== FUNCIONALIDAD DEL FORMULARIO DE REGISTRO =====
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const submitButton = this.querySelector("button[type='submit']");
        submitButton.classList.add("loading");

        // Obteniendo datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            confirmEmail: document.getElementById('confirmEmail').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value
        };

        // Validando formulario
        if (!validateRegistrationForm(formData)) {
            submitButton.classList.remove('loading');
            return;
        }

        // Guardando usuario en localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(formData);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrando mensaje de éxito
        showFlashMessage('Registro exitoso! Bienvenido a HuertoHogar.', 'success');
        
        // Limpiando formulario
        this.reset();
        submitButton.classList.remove('loading');

        // Redirigiendo al login después de 2 segundos
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
    });

    function showFlashMessage(message, category) {
        // Creando contenedor si no existe
        let flashContainer = document.getElementById('flashMessages');
        if (!flashContainer) {
            flashContainer = document.createElement('div');
            flashContainer.id = 'flashMessages';
            flashContainer.className = 'position-fixed top-0 end-0 p-3';
            flashContainer.style.zIndex = '9999';
            document.body.appendChild(flashContainer);
        }

        const flashMessage = document.createElement('div');
        flashMessage.className = `alert alert-${category} alert-dismissible fade show`;
        flashMessage.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        flashContainer.appendChild(flashMessage);
        
        setTimeout(() => {
            flashMessage.remove();
        }, 5000);
    }

    // ===== FUNCIONALIDAD DEL NAVBAR MÓVIL =====
    
    // Inicializando todos los tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializando todos los popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Cerrando navbar móvil al hacer clic en un enlace
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (navbarToggler && navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                // Solo cerrara el menú móvil si está abierto, pero permitira la navegación
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
                // No prevenira el comportamiento por defecto del enlace
                // event.preventDefault() 
            });
        });

        // Cerrando navbar al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarCollapse.contains(event.target);
            const isClickOnToggler = navbarToggler.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // ===== VALIDACIONES DEL FORMULARIO DE REGISTRO =====
    
    // Validación en tiempo real del nombre
    const nombreInput = document.querySelector('#nombre');
    if (nombreInput) {
        nombreInput.addEventListener('blur', function() {
            const nombre = this.value.trim();
            
            if (nombre && nombre.length < 2) {
                this.classList.add('is-invalid');
                showFieldError(this, 'El nombre debe tener al menos 2 caracteres');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
    }

    // Validación en tiempo real del email
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

    // Validación en tiempo real del email de confirmación
    const confirmEmailInput = document.querySelector('#confirmEmail');
    if (confirmEmailInput) {
        confirmEmailInput.addEventListener('blur', function() {
            const email = document.querySelector('#email').value;
            const confirmEmail = this.value.trim();
            
            if (confirmEmail && email !== confirmEmail) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Los emails no coinciden');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
    }

    // Validación en tiempo real de la contraseña
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

    // Validación en tiempo real de la confirmación de contraseña
    const confirmPasswordInput = document.querySelector('#confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const password = document.querySelector('#password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.classList.add('is-invalid');
                showFieldError(this, 'Las contraseñas no coinciden');
            } else {
                this.classList.remove('is-invalid');
                hideFieldError(this);
            }
        });
    }

    // ===== FUNCIONES AUXILIARES =====

    // Mostrando error en un campo
    function showFieldError(field, message) {
        hideFieldError(field); // Para limpiar errores previos
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    // Ocultando error de un campo
    function hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Valido el formulario completo
    function validateRegistrationForm(formData) {
        let isValid = true;

        // Valido nombre
        if (!formData.nombre || formData.nombre.length < 2) {
            const nombreField = document.getElementById('nombre');
            nombreField.classList.add('is-invalid');
            showFieldError(nombreField, 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        }

        // Valido email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            const emailField = document.getElementById('email');
            emailField.classList.add('is-invalid');
            showFieldError(emailField, 'Por favor, ingresa un email válido');
            isValid = false;
        }

        // Valido confirmación de email
        if (formData.email !== formData.confirmEmail) {
            const confirmEmailField = document.getElementById('confirmEmail');
            confirmEmailField.classList.add('is-invalid');
            showFieldError(confirmEmailField, 'Los emails no coinciden');
            isValid = false;
        }

        // Valido contraseña
        if (!formData.password || formData.password.length < 6) {
            const passwordField = document.getElementById('password');
            passwordField.classList.add('is-invalid');
            showFieldError(passwordField, 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }

        // Valido confirmación de contraseña
        if (formData.password !== formData.confirmPassword) {
            const confirmPasswordField = document.getElementById('confirmPassword');
            confirmPasswordField.classList.add('is-invalid');
            showFieldError(confirmPasswordField, 'Las contraseñas no coinciden');
            isValid = false;
        }

        // Valido región
        if (!formData.region) {
            const regionField = document.getElementById('region');
            regionField.classList.add('is-invalid');
            showFieldError(regionField, 'Por favor, selecciona una región');
            isValid = false;
        }

        // Valido comuna
        if (!formData.comuna) {
            const comunaField = document.getElementById('comuna');
            comunaField.classList.add('is-invalid');
            showFieldError(comunaField, 'Por favor, selecciona una comuna');
            isValid = false;
        }
        //retorno la validacion
        return isValid;
    }

    // ===== FUNCIONALIDAD ADICIONAL =====

    // Limpiando formulario
    function clearForm() {
        const form = document.querySelector('#signupForm');
        if (form) {
            form.reset();
            // Limpiando  clases de validación
            const inputs = form.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
            });
            // Limpiando mensajes de error
            const errorMessages = form.querySelectorAll('.invalid-feedback');
            errorMessages.forEach(error => error.remove());
        }
    }

    // Efecto de carga en botón de envío
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            if (this.classList.contains('loading')) {
                this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registrando...';
            } else {
                this.innerHTML = 'Registrarse';
            }
        });
    }

    // Efecto de focus en inputs
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });
});

