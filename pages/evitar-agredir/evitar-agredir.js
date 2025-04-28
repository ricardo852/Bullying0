
// Script para la página Evitar Agredir

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
    
    // Animación para los elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Añadir un retraso secuencial para los pasos
                if (entry.target.classList.contains('change-step') || 
                    entry.target.classList.contains('skill-card')) {
                    const items = Array.from(entry.target.parentElement.children);
                    const index = items.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observar los pasos para el cambio
    document.querySelectorAll('.change-step').forEach(step => {
        observer.observe(step);
    });
    
    // Observar las tarjetas de habilidades
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observar los elementos de mitos y hechos
    document.querySelectorAll('.myth-fact-item').forEach(item => {
        observer.observe(item);
    });
});
