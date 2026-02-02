// ===== NAVBAR FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// ===== MULTI-ITEM CAROUSEL FUNCTIONALITY =====
class MultiCarousel {
    constructor() {
        this.currentIndex = 0;
        this.itemsPerPage = 4;
        this.track = document.getElementById('multiCarouselTrack');
        this.items = this.track ? this.track.querySelectorAll('.gallery-item') : [];
        this.prevBtn = document.getElementById('multiPrevBtn');
        this.nextBtn = document.getElementById('multiNextBtn');
        
        if (this.track && this.items.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
    }
    
    updateCarousel() {
        const maxIndex = Math.max(0, this.items.length - this.itemsPerPage);
        const itemWidth = this.items[0].offsetWidth + 24; // item width + gap
        const offset = -this.currentIndex * itemWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
        }
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.items.length - this.itemsPerPage);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Responsive handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        this.handleResize();
    }
    
    handleResize() {
        const containerWidth = this.track.parentElement.offsetWidth;
        const itemWidth = 250; // Approximate item width including gap
        const containerItems = Math.floor(containerWidth / itemWidth);
        
        if (containerItems < this.itemsPerPage) {
            this.itemsPerPage = Math.max(1, containerItems);
            this.currentIndex = 0;
            this.updateCarousel();
        }
    }
}

// ===== EMAILJS INTEGRATION =====
// Initialize EmailJS with your public key
(function() {
    emailjs.init("H57_BeVWxJ69IRMew"); // Replace with your actual public key
})();

// Contact form submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send('service_7c8lry2', 'template_umf3l2f', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    showNotification('Failed to send message. Please try again or email me directly.', 'error');
                    
                    // Restore button
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MultiCarousel();
    new Carousel();
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLLING =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements that should animate on scroll
const animateElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .gallery-item, .timeline-item, .highlight-item, .memory-item');

animateElements.forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ===== DOWNLOAD RESUME BUTTON =====
const downloadResumeBtn = document.getElementById('downloadResume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple alert for now
    // In production, you would link to an actual PDF file
    alert('Resume download functionality: Please replace this with a link to your actual resume PDF file.');
    
    // Example of how to trigger a download:
    // window.open('path/to/your/resume.pdf', '_blank');
});

// ===== SKILL TAG HOVER EFFECT =====
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        // Add a ripple effect or animation
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== GALLERY IMAGE MODAL (Optional Enhancement) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // You can implement a lightbox/modal here
        // For now, we'll just add a simple click effect
        console.log('Gallery item clicked');
    });
});

// ===== TYPING EFFECT FOR HEADLINE (Optional Enhancement) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on the headline
// window.addEventListener('load', () => {
//     const headline = document.querySelector('.headline');
//     const originalText = headline.textContent;
//     typeWriter(headline, originalText, 50);
// });

// ===== PARALLAX EFFECT FOR HOME SECTION =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeSection = document.querySelector('.home-section');
    
    if (homeSection && scrolled < window.innerHeight) {
        const parallaxElements = document.querySelectorAll('.floating-element');
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===== CURSOR TRAIL EFFECT (Optional Enhancement) =====
// Uncomment to enable custom cursor trail
/*
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();
*/

// ===== PROJECT CARD TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    // Remove loading class if you have one
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const homeElements = document.querySelectorAll('.home-text > *');
        homeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
            }, index * 100);
        });
    }, 100);
});

// ===== SCROLL TO TOP BUTTON (Optional) =====
// Create scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    // Your scroll handler code here
}, 10));

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Portfolio Website by Pranjal Patil', 'color: #6366F1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #3B82F6; font-size: 14px;');
console.log('%chttps://github.com/pranjalpatil22', 'color: #F97316; font-size: 14px;');

// ===== EASTER EGG (Optional) =====
let secretCode = '';
const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

window.addEventListener('keydown', (e) => {
    secretCode += e.key;
    
    if (secretCode.includes(konamiCode)) {
        alert('🎉 You found the secret code! You are awesome!');
        secretCode = '';
    }
    
    if (secretCode.length > konamiCode.length) {
        secretCode = secretCode.slice(-konamiCode.length);
    }
});
