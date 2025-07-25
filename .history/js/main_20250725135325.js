// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    offset: 1
});


// NAVBAR GSAP
// Navbar Shrink on Scroll
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;
    // Update scroll indicator
    scrollIndicator.style.width = scrollPercent + '%';
    // Add/remove scrolled class
    if (scrollTop > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 87;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active link highlighting
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // console.log(sectionTop);
        // console.log(window.pageYOffset);
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
// Add loading animation

document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    const navbar = document.getElementById("navbarContent");


    // Bootstrap collapse instance
    const bsCollapse = new bootstrap.Collapse(navbar, {
        toggle: false,

    });

    // Toggle open/close manually
    toggler.addEventListener("click", function (e) {
        if (navbar.classList.contains("show")) {
            bsCollapse.hide();

        } else {
            bsCollapse.show();

        }


    });

    // Click outside to close
    document.addEventListener("click", function (event) {
        const clickInsideNavbar =
            navbar.contains(event.target) || toggler.contains(event.target);

        // Only on small screens
        if (
            !clickInsideNavbar &&
            navbar.classList.contains("show") &&
            window.innerWidth < 992
        ) {
            bsCollapse.hide();
        }
    });


});





// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}



// Start counter animation when in view
const observer1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer1.disconnect();
        }
    });
});

const statsSection = document.querySelector('.tech-stats-home');
if (statsSection) {
    observer1.observe(statsSection);
}

// Particle System
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';

    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create particles periodically
setInterval(createParticle, 2000);




// Optimize performance


let ticking = false;

function updateAnimations() {
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Intersection observer2 for performance
const observerOptions1 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

// const observer2 = new IntersectionObserver(function (entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('animate');
//         }
//     });
// }, observerOptions1);

// Observe all service cards
// document.querySelectorAll('.service-card').forEach(card => {
//     observer2.observe(card);
// });



// Logo slider pause/resume functionality
const logoSlider = document.getElementById('logoSlider');
const logoTrack = document.getElementById('logoTrack');

logoSlider.addEventListener('mouseenter', function () {
    logoTrack.style.animationPlayState = 'paused';
});

logoSlider.addEventListener('mouseleave', function () {
    logoTrack.style.animationPlayState = 'running';
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 3);
}

// Initialize counters when they come into view
const observerOptionsClient = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observerClient = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            observerClient.unobserve(entry.target);
        }
    });
}, observerOptionsClient);

document.querySelectorAll('.stat-number').forEach(counter => {
    observerClient.observe(counter);
});

// Animate all counters with class 'stat-number-home'
document.querySelectorAll('.stat-number-home').forEach(stat => {
    const value = parseInt(stat.dataset.value, 10) || 0;
    animateCounter(stat, value, 2000);
});

// Enhanced mouse tracking for floating elements
// document.addEventListener('mousemove', (e) => {
//     const floatingElements = document.querySelectorAll('.floating-element');
//     const x = (e.clientX / window.innerWidth) - 0.5;
//     const y = (e.clientY / window.innerHeight) - 0.5;

//     floatingElements.forEach((element, index) => {
//         const speed = (index + 1) * 0.01;
//         const xPos = x * 30 * speed;
//         const yPos = y * 30 * speed;

//         element.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos * 0.5}deg)`;
//     });
// });

// Logo hover effects with staggered animations
document.querySelectorAll('.logo-track img').forEach((img, index) => {
    img.addEventListener('mouseenter', function () {
        // Pause the entire animation temporarily
        logoTrack.style.animationPlayState = 'paused';

        // Add glow effect
        this.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        this.style.borderRadius = '12px';
    });

    img.addEventListener('mouseleave', function () {
        // Resume animation
        setTimeout(() => {
            if (!logoSlider.matches(':hover')) {
                logoTrack.style.animationPlayState = 'running';
            }
        }, 100);

        // Remove glow effect
        this.style.boxShadow = '';
        this.style.background = '';
        this.style.borderRadius = '';
    });
});

// Smooth scroll integration
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'start'
//             });
//         }
//     });
// });

// Performance optimization: Reduce animations on low-performance devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '60s');
}













// CEO JS

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    initializeInteractions();
});

// function initializeAnimations() {
//     // Main container entrance
//     gsap.to('.ceo-container', {
//         opacity: 1,
//         y: 0,
//         duration: 1.2,
//         ease: 'power3.out',
//         scrollTrigger: {
//             trigger: '.ceo-section',
//             start: 'top 70%',
//             toggleActions: 'play none none reverse'
//         }
//     });

//     // Staggered content animations
//     const timeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.content-section',
//             start: 'top 75%',
//             toggleActions: 'play none none reverse'
//         }
//     });

//     timeline
//         .to('.section-badge', {
//             opacity: 1,
//             x: 0,
//             duration: 0.8,
//             ease: 'power2.out'
//         })
//         .to('.welcome-title', {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: 'power2.out'
//         }, '-=0.4')
//         .to('.welcome-subtitle', {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: 'power2.out'
//         }, '-=0.4')
//         .to('.welcome-message', {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: 'power2.out'
//         }, '-=0.3')
//         .to('.stats-mini', {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: 'power2.out'
//         }, '-=0.2')
//         .to('.ceo-info', {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             ease: 'power2.out'
//         }, '-=0.2');

//     // Photo container animation
//     gsap.to('.photo-container', {
//         scale: 1,
//         opacity: 1,
//         duration: 1,
//         ease: 'power2.out',
//         scrollTrigger: {
//             trigger: '.photo-section',
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//         }
//     });


//     const statNumbers = document.querySelectorAll('.stat-mini-number');

//     statNumbers.forEach(stat => {
//         const rawText = stat.textContent.trim();
//         const hasPlus = rawText.includes('+');
//         const targetValue = parseInt(rawText.replace('+', ''));

//         gsap.fromTo(stat,
//             { textContent: 0 },
//             {
//                 textContent: targetValue,
//                 duration: 2,
//                 ease: 'power2.out',
//                 snap: { textContent: 1 },
//                 scrollTrigger: {
//                     trigger: stat.parentElement, // ✅ Use parent if stat is too small
//                     start: 'top 85%',
//                     toggleActions: 'play none none none'
//                 },
//                 onUpdate: function () {
//                     const current = Math.ceil(this.targets()[0].textContent);
//                     stat.textContent = hasPlus ? `${current}+` : `${current}`;
//                 }
//             }
//         );
//     });






//     // Parallax effects for floating elements
//     if (window.innerWidth > 768) {
//         gsap.to('.floating-element:nth-child(1)', {
//             y: -40,
//             x: -20,
//             duration: 1,
//             ease: 'none',
//             scrollTrigger: {
//                 trigger: '.ceo-section',
//                 start: 'top bottom',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         });

//         gsap.to('.floating-element:nth-child(2)', {
//             y: -60,
//             x: 30,
//             duration: 1,
//             ease: 'none',
//             scrollTrigger: {
//                 trigger: '.ceo-section',
//                 start: 'top bottom',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         });

//         gsap.to('.floating-element:nth-child(3)', {
//             y: -30,
//             x: -10,
//             duration: 1,
//             ease: 'none',
//             scrollTrigger: {
//                 trigger: '.ceo-section',
//                 start: 'top bottom',
//                 end: 'bottom top',
//                 scrub: 1
//             }
//         });
//     }
// }

function initializeInteractions() {
    const photoMain = document.querySelector('.photo-main');
    const ceoContainer = document.querySelector('.ceo-container');

    // Enhanced photo hover effect
    photoMain.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            rotation: 2,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.to('.photo-decoration', {
            scale: 1.3,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
        });
    });

    photoMain.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'power2.out'
        });

        gsap.to('.photo-decoration', {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1
        });
    });

    // Container hover effect
    ceoContainer.addEventListener('mouseenter', function () {
        gsap.to(this, {
            y: -5,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    ceoContainer.addEventListener('mouseleave', function () {
        gsap.to(this, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    // Badge hover effect
    const badge = document.querySelector('.section-badge');
    badge.addEventListener('mouseenter', function () {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    badge.addEventListener('mouseleave', function () {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Intersection Observer for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe key elements
document.querySelectorAll('.ceo-container, .photo-container').forEach(el => {
    observer.observe(el);
});



// contact us
// Contact Form Submission
// document.getElementById('contactForm').addEventListener('submit', function (e) {
//     e.preventDefault();

//     const submitBtn = document.getElementById('submitBtn');


// });

// Form field animations
document.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
        this.style.borderColor = 'var(--primary-color)';
    });

    field.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
        if (!this.value) {
            this.style.borderColor = 'rgba(40, 66, 131, 0.1)';
        }
    });
});



// Add typing effect to placeholder
const messageField = document.querySelector('textarea[name="message"]');
const placeholders = [
    "Tell us about your project requirements...",
    "What's your timeline for this project?",
    "Do you have any specific technology preferences?",
    "What's your budget range for this project?",
    "Tell us about your business goals..."
];

let currentPlaceholder = 0;

function changePlaceholder() {
    if (messageField === document.activeElement) return;

    messageField.placeholder = placeholders[currentPlaceholder];
    currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
}

setInterval(changePlaceholder, 3000);

// Add real-time form validation
// document.querySelectorAll('input[required], textarea[required]').forEach(field => {
//     field.addEventListener('input', function () {
//         if (this.value.trim()) {
//             this.style.borderColor = 'var(--success-color)';
//         } else {
//             this.style.borderColor = 'rgba(40, 66, 131, 0.1)';
//         }
//     });
// });


// footer

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size and position
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

        particlesContainer.appendChild(particle);
    }
}

// Newsletter form submission
document.querySelector('.newsletter-form form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    const btn = this.querySelector('.newsletter-btn');

    if (email) {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Subscribe';
            btn.style.background = 'var(--primary-gradient)';
            this.querySelector('.newsletter-input').value = '';
        }, 3000);
    }
});

// Smooth scroll for footer links
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

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
});

// Add hover effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Attach to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            smoothScrollTo(href);
        }
    });
});

// Add loading overlay
document.addEventListener('DOMContentLoaded', function () {
    // Add loading overlay
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(loader);

    // Remove loader after content loads
    window.addEventListener('load', function () {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling with dynamic speed
    const smoothScroll = (target, duration) => {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Interactive parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.1;
            const x = (centerX - clientX) * speed;
            const y = (centerY - clientY) * speed;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
});





// contact form api handle 
