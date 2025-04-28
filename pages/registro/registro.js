// Script para manejar el registro de usuarios

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const passwordError = document.getElementById('password-error');
    const successMessage = document.getElementById('success-message');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                mostrarError('Las contraseñas no coinciden');
                return;
            }

            // Validar requisitos de contraseña
            const resultadoValidacion = validarContraseña(password);
            if (!resultadoValidacion.valido) {
                mostrarError(resultadoValidacion.mensaje);
                return;
            }

            // Obtener usuarios existentes o crear un array vacío
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Verificar si el nombre de usuario ya está en uso
            if (users.some(user => user.username === username)) {
                alert('El nombre de usuario ya está en uso');
                return;
            }

            // Verificar si el correo ya está registrado
            if (users.some(user => user.email === email)) {
                alert('El correo electrónico ya está registrado');
                return;
            }

            // Crear nuevo usuario
            const newUser = {
                name,
                username,
                email,
                password // Nota: En aplicaciones reales nunca se guarda en texto plano
            };

            // Agregar nuevo usuario
            users.push(newUser);

            // Guardar en localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Ocultar formulario y mostrar mensaje de éxito
            registerForm.style.display = 'none';
            successMessage.style.display = 'block';
        });
    }

    // Función para mostrar error
    function mostrarError(mensaje) {
        passwordError.textContent = mensaje;
        passwordError.style.display = 'block';
    }

    // Función para validar la contraseña
    function validarContraseña(password) {
        if (password.length <= 8) {
            return { valido: false, mensaje: "La contraseña debe tener más de 8 caracteres." };
        }

        // Verificar repeticiones de caracteres (máximo 4 veces el mismo carácter)
        const contadorCaracteres = {};
        for (let char of password) {
            contadorCaracteres[char] = (contadorCaracteres[char] || 0) + 1;
            if (contadorCaracteres[char] > 4) {
                return { valido: false, mensaje: `La letra "${char}" se repite más de 4 veces.` };
            }
        }

        // Verificar caracteres consecutivos (por código ASCII)
        for (let i = 0; i < password.length - 1; i++) {
            const codigoActual = password.charCodeAt(i);
            const codigoSiguiente = password.charCodeAt(i + 1);
            if (Math.abs(codigoActual - codigoSiguiente) === 1) {
                return { valido: false, mensaje: "La contraseña no debe tener caracteres consecutivos." };
            }
        }

        return { valido: true, mensaje: "La contraseña es válida." };
    }
});
