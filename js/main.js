/* ========================================
   Aryasoft - Main JavaScript
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initHeader();
    initMobileMenu();
    initTestimonialSlider();
    initSmoothScroll();
    initFormHandler();
    initAnimations();
});

/* ========================================
   Header Scroll Effect
======================================== */
function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   Mobile Menu
======================================== */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (!menuBtn || !navMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}

/* ========================================
   Testimonial Slider
======================================== */
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    let autoSlideInterval;
    
    if (cards.length === 0) return;
    
    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i]?.classList.remove('active');
        });
        
        cards[index].classList.add('active');
        dots[index]?.classList.add('active');
        currentIndex = index;
    }
    
    function nextSlide() {
        const next = (currentIndex + 1) % cards.length;
        showSlide(next);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Start auto slide
    startAutoSlide();
    
    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

/* ========================================
   Smooth Scroll
======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ========================================
   Form Handler
======================================== */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        submitBtn.textContent = '✓ Gönderildi!';
        submitBtn.style.background = '#00C853';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Add floating label effect
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/* ========================================
   Scroll Animations
======================================== */
function initAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .stat-card, .tech-item, .testimonial-content'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(element) {
    const text = element.textContent;
    const match = text.match(/[\d,]+/);
    
    if (!match) return;
    
    const target = parseInt(match[0].replace(/,/g, ''));
    const suffix = text.replace(match[0], '').trim();
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const formatted = Math.floor(current).toLocaleString('tr-TR');
        element.innerHTML = formatted + (suffix ? `<span>${suffix}</span>` : '');
    }, duration / steps);
}

/* ========================================
   Logo Placeholders Generator
======================================== */
// Generate placeholder logos if images don't exist
document.querySelectorAll('.logo-item img, .tech-item img').forEach(img => {
    img.onerror = function() {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-logo';
        placeholder.textContent = this.alt || 'Logo';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f3f4f6;
            border-radius: 8px;
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
        `;
        this.parentElement.replaceChild(placeholder, this);
    };
});

/* ========================================
   Avatar Placeholders Generator
======================================== */
document.querySelectorAll('.author-avatar img').forEach(img => {
    img.onerror = function() {
        const placeholder = document.createElement('div');
        const initials = this.alt ? this.alt.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U';
        placeholder.className = 'avatar-placeholder';
        placeholder.textContent = initials;
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0066FF 0%, #7B61FF 100%);
            color: white;
            font-size: 18px;
            font-weight: 600;
        `;
        this.parentElement.replaceChild(placeholder, this);
    };
});
