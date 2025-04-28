
// Script para la página ¿Qué es el Bullying?

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
    
    // Animación para las tarjetas al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar las tarjetas de tipos de bullying
    document.querySelectorAll('.type-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observar los elementos de consecuencias
    document.querySelectorAll('.consequence-item').forEach(item => {
        observer.observe(item);
    });
});
