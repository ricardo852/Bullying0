
// Script principal para manejar la autenticación

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de inicio de sesión
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simulación de autenticación (en una aplicación real esto se haría con un backend)
            let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = storedUsers.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Guardar información de sesión
                localStorage.setItem('currentUser', JSON.stringify({
                    username: user.username,
                    name: user.name
                }));
                
                // Redirigir a la página de inicio
                window.location.href = 'pages/inicio/inicio.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }
});
