/*
===============================================
Shangpung Turmeric Glow - Interactive JavaScript
===============================================
Features:
- Mobile navigation toggle
- Smooth scrolling
- Form validation and submission
- Scroll animations
- Contact form handling
===============================================
*/

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFormHandling();
    initScrollEffects();
    
    console.log('Shangpung Turmeric Glow website loaded successfully!');
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll(`
        .about-card,
        .product-card,
        .benefit-card,
        .section-header,
        .hero-content,
        .meghalaya-content,
        .contact-content
    `);

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Header Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header when scrolling
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 30px rgba(244, 196, 48, 0.15)';
            header.style.background = 'rgba(255, 254, 247, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(244, 196, 48, 0.1)';
            header.style.background = 'rgba(255, 254, 247, 0.95)';
        }

        lastScrollTop = scrollTop;
    });
}

// Form Validation and Handling
function initFormHandling() {
    const contactForm = document.getElementById('orderForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', validateEmail);
        }

        // Phone validation
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', formatPhoneNumber);
            phoneField.addEventListener('blur', validatePhone);
        }
    }
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate all fields before submission
    if (!validateForm(form)) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        // Create order summary
        const orderData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            product: formData.get('product'),
            quantity: formData.get('quantity'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        console.log('Order submitted:', orderData);
        
        // Show success message
        showSuccessMessage(orderData);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Inquiry';
        
        // Store in local storage for demonstration
        storeOrderData(orderData);
        
    }, 2000); // Simulate 2 second delay
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        setFieldError(field, 'This field is required');
        return false;
    }
    
    setFieldSuccess(field);
    return true;
}

// Validate email format
function validateEmail(e) {
    const field = e.target;
    const email = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        setFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (email) {
        setFieldSuccess(field);
    }
    return true;
}

// Validate phone number
function validatePhone(e) {
    const field = e.target;
    const phone = field.value.replace(/\D/g, '');
    
    if (phone && phone.length < 10) {
        setFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    if (phone) {
        setFieldSuccess(field);
    }
    return true;
}

// Format phone number input
function formatPhoneNumber(e) {
    const field = e.target;
    const value = field.value.replace(/\D/g, '');
    
    // Limit to 10 digits and format
    if (value.length <= 10) {
        let formattedValue = value;
        if (value.length > 5) {
            formattedValue = value.slice(0, 5) + '-' + value.slice(5);
        }
        field.value = formattedValue;
    }
}

// Clear field error state
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
}

// Set field error state
function setFieldError(field, message) {
    field.classList.remove('success');
    field.classList.add('error');
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.9rem; margin-top: 0.5rem;';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Set field success state
function setFieldSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Validate entire form
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Additional validations
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !validateEmail({ target: emailField })) {
        isValid = false;
    }
    
    const phoneField = form.querySelector('#phone');
    if (phoneField && phoneField.value && !validatePhone({ target: phoneField })) {
        isValid = false;
    }
    
    return isValid;
}

// Show success message
function showSuccessMessage(orderData) {
    const message = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 2px solid #F4C430;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #F4C430, #FF8C42);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
            ">
                <i class="fas fa-check" style="color: #2C1810; font-size: 1.5rem;"></i>
            </div>
            <h3 style="color: #2C1810; margin-bottom: 1rem;">Order Inquiry Sent Successfully!</h3>
            <p style="color: #5D2E1A; margin-bottom: 1.5rem;">
                Thank you ${orderData.fullName}! We've received your inquiry and will contact you within 24 hours 
                with pricing and delivery details.
            </p>
            <div style="background: rgba(244, 196, 48, 0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; text-align: left;">
                <strong style="color: #2C1810;">Order Summary:</strong><br>
                <span style="color: #5D2E1A;">Product: ${orderData.product || 'Not specified'}</span><br>
                <span style="color: #5D2E1A;">Quantity: ${orderData.quantity || 'Not specified'}</span><br>
                <span style="color: #5D2E1A;">Contact: ${orderData.email}</span>
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: linear-gradient(135deg, #F4C430, #FF8C42);
                color: #2C1810;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 25px;
                font-weight: 500;
                cursor: pointer;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    document.body.appendChild(messageElement);
}

// Show generic message
function showMessage(text, type = 'info') {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#F4C430'
    };
    
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
    `;
    messageElement.textContent = text;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Store order data in localStorage for demonstration
function storeOrderData(orderData) {
    try {
        let orders = JSON.parse(localStorage.getItem('turmericOrders') || '[]');
        orders.push(orderData);
        localStorage.setItem('turmericOrders', JSON.stringify(orders));
        console.log('Order stored locally:', orderData);
    } catch (error) {
        console.error('Error storing order data:', error);
    }
}

// Utility function to get stored orders (for demonstration)
function getStoredOrders() {
    try {
        return JSON.parse(localStorage.getItem('turmericOrders') || '[]');
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return [];
    }
}

// Easter egg: Konami code for admin panel (for demonstration)
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showAdminPanel();
        konamiCode = [];
    }
});

// Admin panel for viewing orders (demonstration feature)
function showAdminPanel() {
    const orders = getStoredOrders();
    
    const adminPanel = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <h3 style="color: #2C1810; margin-bottom: 1rem;">
                <i class="fas fa-chart-line"></i> Order Management Panel
            </h3>
            <p style="color: #5D2E1A; margin-bottom: 1.5rem;">
                Total Orders: ${orders.length}
            </p>
            <div style="max-height: 400px; overflow-y: auto;">
                ${orders.map((order, index) => `
                    <div style="
                        background: rgba(244, 196, 48, 0.1);
                        padding: 1rem;
                        margin-bottom: 1rem;
                        border-radius: 10px;
                        border-left: 4px solid #F4C430;
                    ">
                        <strong>Order #${index + 1}</strong><br>
                        <strong>Name:</strong> ${order.fullName}<br>
                        <strong>Email:</strong> ${order.email}<br>
                        <strong>Phone:</strong> ${order.phone}<br>
                        <strong>Product:</strong> ${order.product || 'Not specified'}<br>
                        <strong>Quantity:</strong> ${order.quantity || 'Not specified'}<br>
                        <strong>Date:</strong> ${new Date(order.timestamp).toLocaleDateString()}<br>
                        ${order.message ? `<strong>Message:</strong> ${order.message}` : ''}
                    </div>
                `).join('') || '<p style="color: #5D2E1A; text-align: center; font-style: italic;">No orders yet.</p>'}
            </div>
            <div style="text-align: center; margin-top: 1.5rem;">
                <button onclick="localStorage.removeItem('turmericOrders'); location.reload();" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    margin-right: 1rem;
                    cursor: pointer;
                ">Clear All Orders</button>
                <button onclick="this.closest('.admin-panel-container').remove()" style="
                    background: linear-gradient(135deg, #F4C430, #FF8C42);
                    color: #2C1810;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                ">Close</button>
            </div>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    const adminElement = document.createElement('div');
    adminElement.className = 'admin-panel-container';
    adminElement.innerHTML = adminPanel;
    document.body.appendChild(adminElement);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any additional scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading animation to images when they load
document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-placeholder');
    
    imageContainers.forEach(container => {
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        
        // Add subtle animation effect
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Console welcome message
console.log(`
%c🌟 Shangpung Turmeric Glow Website 🌟
%cWelcome to the premium Lakadong turmeric experience!
%cWebsite features:
• Responsive design for all devices
• Interactive contact form
• Smooth scrolling navigation  
• SEO optimized content
• Admin panel (try the Konami code!)

%cBuilt with ❤️ for authentic Meghalaya turmeric
`, 
'color: #F4C430; font-size: 16px; font-weight: bold;',
'color: #FF8C42; font-size: 14px;',
'color: #2C1810; font-size: 12px;',
'color: #8B4513; font-size: 12px; font-style: italic;'
);