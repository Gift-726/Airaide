// Mobile Menu Toggle - Only active on screens ≤768px
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const nav = document.getElementById('nav');

// Function to check if we're on mobile (≤768px)
function isMobileView() {
    return window.innerWidth <= 768;
}

// Open mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (isMobileView()) {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }
    });
}

// Close mobile menu
if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking on the CTA button
const mobileCtaButton = document.querySelector('.mobile-cta-button');
if (mobileCtaButton) {
    mobileCtaButton.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        // You can add navigation logic here if needed
    });
}

// Close menu when resizing to desktop view
window.addEventListener('resize', () => {
    if (!isMobileView() && mobileMenuOverlay.classList.contains('active')) {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});



// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});


// Navbar scroll effect - only for screens 769px and above
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isDesktop = window.innerWidth >= 769;

    if (nav && isDesktop) {
        // Don't add scrolled class on services page - it has its own background
        const isServicesPage = nav.classList.contains('services-page');
        
        if (currentScroll > 50 && !isServicesPage) {
            nav.classList.add('scrolled');
        } else if (!isServicesPage) {
            nav.classList.remove('scrolled');
        }
    }
});

// Handle resize to update navbar state
window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth >= 769;
    if (nav) {
        const isServicesPage = nav.classList.contains('services-page');
        if (!isDesktop && !isServicesPage) {
            nav.classList.remove('scrolled');
        }
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    const subscribeBtn = newsletterForm.querySelector('.btn-primary');

    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value;

            if (email && isValidEmail(email)) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! We\'ll keep you updated with the latest insights.');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const faqHeader = item.querySelector('.faq-header');
        if (faqHeader) {
            faqHeader.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

