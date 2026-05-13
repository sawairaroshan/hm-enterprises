/**
 * H M ENTERPRISES - Premium Landing Page
 * Vanilla JavaScript - No Frameworks
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for glassmorphism effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ============================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // 3D TILT CARD EFFECT
    // ============================================
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10; // Max 10deg rotation
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ============================================
    // ANIMATED COUNTER
    // ============================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.parentElement.parentElement.dataset.target);
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
        counterObserver.observe(stat);
    });

    // ============================================
    // CONTACT FORM VALIDATION & WHATSAPP INTEGRATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // Real-time validation
    const validateName = () => {
        const name = nameInput.value.trim();
        const errorEl = document.getElementById('nameError');
        
        if (name.length < 3) {
            nameInput.classList.add('error');
            errorEl.textContent = 'Name must be at least 3 characters';
            errorEl.classList.add('show');
            return false;
        }
        
        nameInput.classList.remove('error');
        errorEl.classList.remove('show');
        return true;
    };

    const validatePhone = () => {
        const phone = phoneInput.value.trim();
        const errorEl = document.getElementById('phoneError');
        
        // Pakistani phone format: 03XXXXXXXXX (11 digits starting with 03)
        const pakPhoneRegex = /^03\d{9}$/;
        
        if (!phone) {
            phoneInput.classList.add('error');
            errorEl.textContent = 'Phone number is required';
            errorEl.classList.add('show');
            return false;
        }
        
        if (!pakPhoneRegex.test(phone)) {
            phoneInput.classList.add('error');
            errorEl.textContent = 'Enter valid Pakistani number (03XXXXXXXXX)';
            errorEl.classList.add('show');
            return false;
        }
        
        phoneInput.classList.remove('error');
        errorEl.classList.remove('show');
        return true;
    };

    const validateService = () => {
        const service = serviceInput.value;
        const errorEl = document.getElementById('serviceError');
        
        if (!service) {
            serviceInput.classList.add('error');
            errorEl.textContent = 'Please select a service';
            errorEl.classList.add('show');
            return false;
        }
        
        serviceInput.classList.remove('error');
        errorEl.classList.remove('show');
        return true;
    };

    // Attach real-time validation
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('error')) validateName();
    });

    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', () => {
        // Auto-format: remove non-digits
        phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 11);
        if (phoneInput.classList.contains('error')) validatePhone();
    });

    serviceInput.addEventListener('change', validateService);

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isServiceValid = validateService();

        if (!isNameValid || !isPhoneValid || !isServiceValid) {
            // Shake the form
            contactForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 500);
            return;
        }

        // Build WhatsApp message
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();

        let formattedMessage = `Hello H M Enterprises,\n\n`;
        formattedMessage += `My Name: ${name}\n`;
        formattedMessage += `Phone: ${phone}\n`;
        formattedMessage += `Service: ${service}\n`;
        
        if (message) {
            formattedMessage += `\nMessage:\n${message}`;
        }

        // Encode and redirect to WhatsApp
        const encodedMessage = encodeURIComponent(formattedMessage);
        const whatsappUrl = `https://wa.me/923435239496?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO SHAPES
    // ============================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ============================================
    // PROJECT CARD HOVER EFFECT ENHANCEMENT
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            setTimeout(() => {
                card.style.zIndex = '1';
            }, 300);
        });
    });

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    console.log('🚀 H M Enterprises website loaded successfully!');
});