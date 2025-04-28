
// Script para manejar el registro de usuarios

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de registro
    const registerForm = document.getElementById('register-form');
    const passwordError = document.getElementById('password-error');
    const successMessage = document.getElementById('success-message');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                passwordError.textContent = 'Las contraseñas no coinciden';
                passwordError.style.display = 'block';
                return;
            } else {
                passwordError.style.display = 'none';
            }
            
            // Obtener usuarios existentes o crear un array vacío
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Verificar si el usuario ya existe
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
                password // Nota: En una aplicación real NUNCA se debería almacenar contraseñas en texto plano
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
});
