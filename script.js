// Menú hamburguesa para móviles
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Cambiar color de la barra al hacer scroll
const header = document.querySelector('header');

function updateHeader() {
    if (window.scrollY > 50 || navMenu.classList.contains('active')) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Ejecutar al cargar y al hacer scroll
updateHeader();
window.addEventListener('scroll', updateHeader);

// También actualizar al abrir/cerrar el menú (móvil)
hamburger.addEventListener('click', () => {
    updateHeader();
});

// Cerrar menú al hacer clic en cualquier parte fuera del menú (opcional)
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target) || hamburger.contains(event.target);
    
    if (!isClickInsideMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        updateHeader();
    }
});

// Modal de contacto
function mostrarContacto() {
    const modal = document.getElementById('contacto-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function cerrarContacto() {
    const modal = document.getElementById('contacto-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    const modal = document.getElementById('contacto-modal');
    if (event.target === modal) {
        cerrarContacto();
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('contacto-modal');
    if (event.key === 'Escape' && modal.style.display === 'block') {
        cerrarContacto();
    }
});

// Manejo del formulario de contacto
document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const formData = new FormData(this);
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const telefono = this.querySelector('input[type="tel"]').value;
    const mensaje = this.querySelector('textarea').value;
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Simular envío del formulario
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular tiempo de envío
    setTimeout(() => {
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        
        // Resetear el formulario
        this.reset();
        
        // Cerrar el modal
        cerrarContacto();
        
        // Restaurar el botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Efecto de scroll suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas
const animatedElements = document.querySelectorAll('.feature-card, .service-card, .stat-card, .value-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animación de contadores para las estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Activar animación de contadores cuando se vean las estadísticas
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Prevenir el envío del formulario con Enter en los campos individuales
document.querySelectorAll('#contacto-form input').forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Enfocar el siguiente campo o enviar si es el último
            const nextElement = this.nextElementSibling;
            if (nextElement && nextElement.tagName !== 'BUTTON') {
                nextElement.focus();
            } else {
                document.getElementById('contacto-form').dispatchEvent(new Event('submit'));
            }
        }
    });
});

// Validación en tiempo real del email
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('input', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
}

// Mostrar notificación de bienvenida al cargar la página
window.addEventListener('load', () => {
    // Solo mostrar una vez por sesión
    if (!sessionStorage.getItem('bienvenido')) {
        setTimeout(() => {
            console.log('¡Bienvenido a SeguridadPro! Tu seguridad es nuestra prioridad.');
            sessionStorage.setItem('bienvenido', 'true');
        }, 1000);
    }
});

// Actualizar header al cambiar el tamaño de la ventana (responsive)
window.addEventListener('resize', () => {
    // Si estamos en escritorio y el menú está abierto, cerrarlo
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        updateHeader();
    }
});