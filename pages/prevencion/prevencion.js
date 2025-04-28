
// Script para la página de prevención del bullying

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
    
    // Functionality for tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Animación para las cards de estrategias y habilidades al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar las tarjetas de estrategias
    document.querySelectorAll('.strategy-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observar las tarjetas de habilidades
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
});
