/**
 * Footer Web Component
 * Componente moderno de footer usando Web Components API
 */

class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupAnimations();
        this.setupEventListeners();
    }

    render() {
        const template = document.getElementById('footer-template');
        if (template) {
            const clone = template.content.cloneNode(true);
            this.shadowRoot.appendChild(clone);
        }
    }

    /**
     * Configura animaciones del footer
     */
    setupAnimations() {
        const footer = this.shadowRoot.querySelector('.footer');
        
        // Observador para animación de entrada cuando el footer entra en viewport
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFooter();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (footer) {
            observer.observe(footer);
        }
    }

    /**
     * Anima los elementos del footer al entrar en viewport
     */
    animateFooter() {
        const sections = this.shadowRoot.querySelectorAll('.footer-section');
        const divider = this.shadowRoot.querySelector('.footer-divider');
        const bottom = this.shadowRoot.querySelector('.footer-bottom');

        // Animar secciones con stagger
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            
            // Trigger reflow para forzar transición
            section.offsetHeight;
            
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });

        // Animar divisor
        if (divider) {
            divider.style.opacity = '0';
            divider.style.transition = 'opacity 0.8s ease 0.4s';
            divider.offsetHeight;
            divider.style.opacity = '1';
        }

        // Animar footer bottom
        if (bottom) {
            bottom.style.opacity = '0';
            bottom.style.transition = 'opacity 0.8s ease 0.5s';
            bottom.offsetHeight;
            bottom.style.opacity = '1';
        }
    }

    /**
     * Configura event listeners para interacciones
     */
    setupEventListeners() {
        const socialLinks = this.shadowRoot.querySelectorAll('.social-icon');
        const footerLinks = this.shadowRoot.querySelectorAll('.footer-links a');

        // Efecto ripple en iconos sociales
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.createRipple(e, link);
            });

            link.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });

        // Track de clicks en enlaces
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                this.trackLinkClick(href);
            });
        });

        // Efecto parallax leve en scroll
        window.addEventListener('scroll', () => {
            this.updateParallaxEffect();
        });
    }

    /**
     * Crea efecto ripple al hacer click
     */
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    /**
     * Toca un sonido suave al pasar sobre elementos (opcional)
     */
    playHoverSound() {
        // Comentado por defecto, descomenta si quieres efectos de sonido
        // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // const osc = audioContext.createOscillator();
        // const gain = audioContext.createGain();
        // osc.connect(gain);
        // gain.connect(audioContext.destination);
        // gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        // gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        // osc.frequency.setValueAtTime(800, audioContext.currentTime);
        // osc.start(audioContext.currentTime);
        // osc.stop(audioContext.currentTime + 0.1);
    }

    /**
     * Actualiza el efecto parallax en scroll
     */
    updateParallaxEffect() {
        const footer = this.shadowRoot.querySelector('.footer');
        if (footer && window.scrollY > 0) {
            const scrollPosition = window.scrollY * 0.3;
            footer.style.backgroundPosition = `0 ${scrollPosition}px`;
        }
    }

    /**
     * Registra clicks en enlaces para analytics (si está disponible)
     */
    trackLinkClick(href) {
        // Integración con GA o tu sistema de analytics
        if (window.gtag) {
            window.gtag('event', 'footer_link_click', {
                'link_destination': href
            });
        }

        // Log en consola para desarrollo
        console.log(`Footer link clicked: ${href}`);
    }

    /**
     * Método público para actualizar información de contacto
     */
    updateContactInfo(phone, email, location) {
        const phoneElement = this.shadowRoot.querySelector('.contact-item a[href^="tel:"]');
        const emailElement = this.shadowRoot.querySelector('.contact-item a[href^="mailto:"]');
        const locationElement = this.shadowRoot.querySelector('.contact-item span');

        if (phoneElement && phone) {
            phoneElement.href = `tel:${phone}`;
            phoneElement.textContent = phone;
        }
        if (emailElement && email) {
            emailElement.href = `mailto:${email}`;
            emailElement.textContent = email;
        }
        if (locationElement && location) {
            locationElement.textContent = location;
        }
    }

    /**
     * Método público para actualizar enlaces de redes sociales
     */
    updateSocialLinks(networks) {
        const socialIcons = this.shadowRoot.querySelectorAll('.social-icon');
        const networkArray = Object.entries(networks);

        socialIcons.forEach((icon, index) => {
            if (index < networkArray.length) {
                const [network, url] = networkArray[index];
                icon.href = url;
                icon.title = network.charAt(0).toUpperCase() + network.slice(1);
            }
        });
    }

    /**
     * Método para toggle de tema (si lo necesitas)
     */
    toggleTheme(isDark) {
        const footer = this.shadowRoot.querySelector('.footer');
        if (footer) {
            footer.style.opacity = isDark ? '1' : '0.95';
        }
    }
}

// Registrar el Web Component
customElements.define('footer-component', FooterComponent);

// Auto-cargar el footer en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Buscar si ya existe un contenedor para el footer
    let footerContainer = document.getElementById('footer-container');
    
    // Si no existe, crear uno al final del body
    if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.id = 'footer-container';
        document.body.appendChild(footerContainer);
    }

    // Cargar el archivo HTML del footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar footer.html');
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
            
            // Cargar el script del footer si no está ya cargado
            if (!document.querySelector('script[src="footer.js"]')) {
                const script = document.createElement('script');
                script.src = 'footer.js';
                script.defer = true;
                document.head.appendChild(script);
            }
        })
        .catch(error => {
            console.error('Error al cargar el footer:', error);
        });
});

// Agregar estilos de animación faltantes al DOM si es necesario
const addAnimationStyles = () => {
    const styleId = 'footer-animations-style';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(40px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .footer-section {
                animation: slideInFromBottom 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
};

addAnimationStyles();
