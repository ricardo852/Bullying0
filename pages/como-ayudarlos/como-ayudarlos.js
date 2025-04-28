
// Script para la página Cómo Ayudar a las Víctimas de Bullying

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
                
                // Añadir un retraso secuencial para los elementos en listas
                if (entry.target.classList.contains('step-item') || 
                    entry.target.classList.contains('sign-item') ||
                    entry.target.classList.contains('tip-card')) {
                    const items = Array.from(entry.target.parentElement.children);
                    const index = items.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observar las señales de advertencia
    document.querySelectorAll('.sign-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observar los pasos para ayudar
    document.querySelectorAll('.step-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observar los consejos de recuperación
    document.querySelectorAll('.tip-card').forEach(item => {
        observer.observe(item);
    });
    
    // Efectos para la caja de cita
    const quoteBox = document.querySelector('.quote-box');
    if (quoteBox) {
        observer.observe(quoteBox);
    }
});
