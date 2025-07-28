import gsap from 'gsap';
import { ScrollTrigger } from 'ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Loader animation & progress simulation
document.addEventListener('DOMContentLoaded', () => {
    // Load particles.js
    initParticles();
    
    // Simulate loading progress
    simulateLoading();
    
    // Initialize the rest of the site functionality
    initSite();
});

function simulateLoading() {
    let progress = 0;
    const progressElement = document.getElementById('loader-progress');
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Fade out loader
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        loader.style.display = 'none';
                        mainContent.classList.remove('hidden');
                        
                        // Animate content in
                        animateContent();
                    }
                });
            }, 500);
        }
        
        progressElement.textContent = `${progress}%`;
    }, 200);
}

function animateContent() {
    // Animate navbar
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    // Animate hero content
    gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Animate hero image
    gsap.from('.hero-image', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    gsap.from(galleryItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%'
        },
        onComplete: () => {
            // Ensure all images are visible after animation
            galleryItems.forEach(item => {
                const image = item.querySelector('.gallery-image');
                if (image) {
                    image.style.opacity = '1';
                    image.style.filter = 'brightness(1.2) contrast(1) saturate(1.1)';
                }
            });
        }
    });
    
    // Animate artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    gsap.from(artistCards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.artists-grid',
            start: 'top 80%'
        }
    });
}

// Update particles configuration
function initParticles() {
    // Check if particles.js is loaded and wait for window load to avoid errors
    window.addEventListener('load', () => {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 60,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#8B0000'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.2,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.05,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#8B0000',
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.3
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        } else {
            console.error('particles.js not loaded');
        }
    });
}

function initSite() {
    // Ensure all images are properly loaded and visible
    const allImages = document.querySelectorAll('.gallery-image, .artist-photo');
    allImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.1)';
        });
        
        // If image is already loaded, apply styles immediately
        if (img.complete) {
            img.style.opacity = '1';
            img.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.1)';
        }
    });
    
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link on mobile
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Theme toggle (dark/light mode)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Toggle icon
            const icon = themeToggle.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize gallery items to be visible by default
    galleryItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.display = 'block';
        
        // Ensure images are loaded and visible
        const image = item.querySelector('.gallery-image');
        if (image) {
            image.style.opacity = '1';
            image.style.filter = 'brightness(1.2) contrast(1.2) saturate(1.1)';
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to current
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        display: 'block'
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        display: 'none'
                    });
                }
            });
        });
    });
    
    // Modal functionality for gallery items
    const galleryItemDetails = document.querySelectorAll('.view-details');
    const modal = document.getElementById('tattoo-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Tattoo details data
    const tattooData = {
        'Retrato Realista': {
            artist: 'Daniel Solarte',
            description: 'Retrato hiperrealista que captura cada detalle con precisión fotográfica. Técnica de sombreado avanzada y atención meticulosa a las texturas.',
            style: 'Realismo',
            duration: '8-10 horas',
            difficulty: 5
        },
        'Minimalismo Elegante': {
            artist: 'Daniel Solarte',
            description: 'Diseño limpio y minimalista que comunica más con menos. Líneas precisas y espacios negativos estratégicamente colocados.',
            style: 'Minimalista',
            duration: '2-3 horas',
            difficulty: 3
        },
        'Patrón Geométrico': {
            artist: 'Daniel Solarte',
            description: 'Compleja combinación de formas geométricas que crea un efecto visual hipnótico. Precisión matemática en cada línea y ángulo.',
            style: 'Geométrico',
            duration: '5-7 horas',
            difficulty: 4
        },
        'Tradicional Old School': {
            artist: 'Daniel Solarte',
            description: 'Clásico estilo tradicional con líneas audaces y colores sólidos. Diseño atemporal inspirado en la era dorada del tatuaje americano.',
            style: 'Tradicional',
            duration: '4-6 horas',
            difficulty: 3
        },
        'Paisaje Natural': {
            artist: 'Daniel Solarte',
            description: 'Representación detallada de un paisaje natural con técnicas avanzadas de degradado para crear profundidad y atmósfera.',
            style: 'Realismo',
            duration: '7-9 horas',
            difficulty: 5
        },
        'Mandala Moderno': {
            artist: 'Daniel Solarte',
            description: 'Reinterpretación contemporánea de un mandala tradicional, fusionando elementos geométricos precisos con influencias modernas.',
            style: 'Geométrico',
            duration: '6-8 horas',
            difficulty: 4
        }
    };
    
    galleryItemDetails.forEach(item => {
        item.addEventListener('click', () => {
            const tattooName = item.parentElement.querySelector('h3').textContent;
            const data = tattooData[tattooName];
            
            if (data) {
                document.getElementById('modal-title').textContent = tattooName;
                document.getElementById('modal-artist').textContent = `Artista: ${data.artist}`;
                document.getElementById('modal-desc').textContent = data.description;
                document.getElementById('modal-style').textContent = data.style;
                document.getElementById('modal-duration').textContent = data.duration;
                
                // Set difficulty dots
                const difficultyMeter = document.getElementById('modal-difficulty');
                difficultyMeter.innerHTML = '';
                for (let i = 0; i < 5; i++) {
                    const dot = document.createElement('span');
                    dot.style.backgroundColor = i < data.difficulty ? '#10F0F0' : '#333';
                    difficultyMeter.appendChild(dot);
                }
                
                // Clone image or SVG
                const imageElement = item.closest('.item-inner').querySelector('.gallery-image');
                const svgElement = item.closest('.item-inner').querySelector('svg');
                const modalImage = document.querySelector('.modal-image');
                modalImage.innerHTML = '';
                
                if (imageElement && imageElement.style.display !== 'none') {
                    const clonedImage = imageElement.cloneNode(true);
                    clonedImage.style.width = '100%';
                    clonedImage.style.height = 'auto';
                    modalImage.appendChild(clonedImage);
                } else if (svgElement) {
                    const clonedSvg = svgElement.cloneNode(true);
                    modalImage.appendChild(clonedSvg);
                }
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (valid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.submit-btn');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                setTimeout(() => {
                    submitButton.textContent = '¡Enviado!';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = window.innerWidth < 768 ? 60 : 80;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile touch improvements
    if (window.innerWidth < 768) {
        // Improve touch targets
        const touchElements = document.querySelectorAll('.gallery-item, .artist-card, .filter-btn, .cta-button');
        touchElements.forEach(element => {
            element.style.minHeight = '44px'; // iOS minimum touch target
        });

        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}