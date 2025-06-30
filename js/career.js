// Initialize AOS
AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true
});

// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth scrolling for anchor links
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', function () {
    // Recalculate any dynamic elements if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
    });
});

// Keyboard navigation enhancements
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('.form-control, .form-select')) {
        e.preventDefault();
        const formElements = Array.from(document.querySelectorAll('.form-control, .form-select, .form-check-input'));
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];

        if (nextElement) {
            nextElement.focus();
        }
    }
});



document.querySelectorAll(".btn-apply-now, .join-team-badge").forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.getElementById("job-openings");
        if (target) {
            const offsetTop = target.offsetTop - 87;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



// --- Merge all DOMContentLoaded logic here ---
document.addEventListener('DOMContentLoaded', function () {
    // Hero title animation
    createParticles();
    gsap.from(".hero-title", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });

    // Floating animation for tech icons
    gsap.to(".tech-icon", {
        duration: 8,
        y: -30,
        rotation: 360,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
            each: 0.5,
            repeat: -1
        }
    });

    // Culture highlights stagger animation
    gsap.from(".culture-item", {
        duration: 0.8,
        y: 20,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.1,
        delay: 1
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

        if (!isNaN(numericValue)) {
            gsap.from(stat, {
                duration: 2,
                textContent: 0,
                roundProps: "textContent",
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                onUpdate: function () {
                    const current = Math.round(this.targets()[0].textContent);
                    const suffix = finalValue.replace(/[\d]/g, '');
                    stat.textContent = current + suffix;
                }
            });
        }
    });

    // Button hover animations
    document.querySelectorAll('.btn-apply-now, .btn-learn-more').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', function () {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // --- Form logic ---





    // const modal = document.getElementById('applyModal');


    const fileInput = document.getElementById('resume');
    const fileLabel = fileInput.nextElementSibling;
    const fileText = fileLabel.querySelector('.file-upload-text');

    fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            fileText.textContent = fileName;
            fileLabel.classList.add('file-selected');
            clearError('resume');
        } else {
            fileText.textContent = 'Choose Resume File';
            fileLabel.classList.remove('file-selected');
        }
    });


    //      APPLICATION FORM HANDLER

    const form = document.getElementById("applicationForm");
    const submitBtn = document.getElementById("submitBtn");

    // Clear all error messages
    function clearErrors() {
        const errorFields = ["full_name", "email", "phone", "resume"];
        errorFields.forEach(field => {
            const errorSpan = document.getElementById(`${field}Error`);
            if (errorSpan == resumeError) errorSpan.value = "";
            else if (errorSpan) errorSpan.textContent = "";
        });
    }


    function showToast(message, isSuccess = true) {
        Swal.fire({
            icon: isSuccess ? 'success' : 'error',
            title: isSuccess ? 'Success!' : 'Error!',
            text: message,
            confirmButtonColor: isSuccess ? '#3085d6' : '#d33',
            timer: 4000,
            timerProgressBar: true
        });
    }

    // Handle API response and display errors
    function handleErrors(errorMsg) {
        // Laravel returns only one error at a time, so we find the relevant field
        console.log(errorMsg);
        const lowerMsg = errorMsg.toLowerCase();

        if (lowerMsg.includes("full name")) {
            document.getElementById("full_nameError").textContent = errorMsg;
        } else if (lowerMsg.includes("email")) {
            document.getElementById("emailError").textContent = errorMsg;
        } else if (lowerMsg.includes("phone")) {
            document.getElementById("phoneError").textContent = errorMsg;
        } else if (lowerMsg.includes("resume")) {
            document.getElementById("resumeError").textContent = errorMsg;
        } else {
            // General fallback
            showToast(errorMsg, false);
        }
    }

    // Prepare and submit form data
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearErrors();

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Sending...`;

            const response = await fetch("https://mfs.winxx777.live/api/send-resume", {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });

            const result = await response.json();
            console.log(result);
            console.log(response);
            if (response.status === 200 && result.status === true) {
                showToast("Form submitted successfully!", true);
                form.reset();
            } else if (response.status === 422) {
                handleErrors(result.message || "Please fix the errors and try again.");
            } else {
                showToast(result.message || "Something went wrong. Try again later.", false);
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Network/server error. Please try again later.", false);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-paper-plane me-2"></i><span>Send Message</span>`;
        }
    });

});

document.querySelector("#year").textContent = new Date().getFullYear();
