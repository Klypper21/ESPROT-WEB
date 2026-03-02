        // Initialize Lenis for smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Integrate Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Scroll Progress Bar
        lenis.on('scroll', ({ progress }) => {
            document.getElementById('scrollProgress').style.width = `${progress * 100}%`;
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .to('.hero-content h1 .line', {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: 'power4.out'
            })
            .to('.hero-content p', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.hero-content .btn', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)'
            }, '-=0.5');

        // Hero Parallax
        gsap.to('.hero-bg', {
            yPercent: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.floating-shield', {
            rotation: 360,
            yPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Services Section Animations
        gsap.to('.section-header h2', {
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.to('.section-header p', {
            scrollTrigger: {
                trigger: '.section-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Service Cards Stagger Animation
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                rotateX: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Location Section Animations
        gsap.to('.location-info', {
            scrollTrigger: {
                trigger: '.location-content',
                start: 'top 70%',
                toggleActions: 'play none none reverse',
                onEnter: () => document.querySelector('.location-info').classList.add('revealed')
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.to('.map-container', {
            scrollTrigger: {
                trigger: '.location-content',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Branch Items Stagger
        gsap.utils.toArray('.branch-item').forEach((item, i) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Quote Text Animation
        gsap.to('.quote-text', {
            scrollTrigger: {
                trigger: '.quote-text',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        });

        // Footer Animations
        ScrollTrigger.create({
            trigger: '.site-footer',
            start: 'top 80%',
            onEnter: () => {
                document.querySelector('.site-footer').classList.add('revealed');
                
                gsap.to('.footer-column', {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });

                document.querySelectorAll('.footer-column').forEach(col => {
                    col.classList.add('revealed');
                });

                gsap.to('.footer-bottom', {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.4,
                    ease: 'power3.out'
                });
            }
        });

        // Magnetic Effect
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(elem => {
            elem.addEventListener('mousemove', (e) => {
                const rect = elem.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(elem, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            elem.addEventListener('mouseleave', () => {
                gsap.to(elem, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Hamburger Menu Logic
        function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                lenis.start();
            });
        });

        // Scroll Header Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });

        // Carousel Logic
        let slideIndices = [0, 0, 0, 0, 0, 0];
        
        function moveSlide(step, carouselIndex) {
            const slides = document.querySelectorAll('.carousel-slide');
            const totalSlides = slides[carouselIndex].children.length;
            
            slideIndices[carouselIndex] = (slideIndices[carouselIndex] + step + totalSlides) % totalSlides;
            
            gsap.to(slides[carouselIndex], {
                x: -slideIndices[carouselIndex] * 100 + '%',
                duration: 0.5,
                ease: 'power2.inOut'
            });
        }
        
        // Animaciones para Sede Principal y UEB
gsap.to('.sede-container', {
    scrollTrigger: {
        trigger: '.sede-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
});

// Animación para tarjetas UEB
gsap.utils.toArray('.ueb-card').forEach((card, i) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power3.out'
    });
});

// Animación para leyenda del mapa
gsap.to('.map-legend', {
    scrollTrigger: {
        trigger: '.map-container',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out'
});

        // Modal Logic with Animation
        function openModal() { 
            const modal = document.getElementById('contactModal');
            modal.classList.add('active');
            lenis.stop();
        }
        
        function closeModal() { 
            const modal = document.getElementById('contactModal');
            modal.classList.remove('active');
            lenis.start();
        }

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('contactModal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate button
            const btn = e.target.querySelector('.btn');
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('¡Gracias por su solicitud! Nos pondremos en contacto pronto.');
                    closeModal();
                    e.target.reset();
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.2
                    });
                }
            });
        });