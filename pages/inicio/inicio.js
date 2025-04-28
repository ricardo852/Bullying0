
// Script para la página de inicio

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Si no hay usuario autenticado, redirigir al login
        window.location.href = '../../index.html';
        return;
    }
    
    // Mostrar nombre de usuario
    const userGreeting = document.getElementById('user-greeting');
    if (userGreeting) {
        userGreeting.textContent = `Hola, ${currentUser.name || currentUser.username}`;
    }
    
    // Manejar cierre de sesión
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Eliminar información de usuario actual
            localStorage.removeItem('currentUser');
            // Redirigir al login
            window.location.href = '../../index.html';
        });
    }
});
