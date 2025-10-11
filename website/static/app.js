// Mobile Navigation Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = mobileMenu.classList.contains('is-active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        mobileMenu.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Event listener for hamburger menu click
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Add accessibility attributes
        mobileMenu.setAttribute('aria-label', 'Toggle navigation menu');
        mobileMenu.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('role', 'button');
        mobileMenu.setAttribute('tabindex', '0');

        // Handle keyboard navigation (Enter and Space keys)
        mobileMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    // Close menu when clicking on navigation links (mobile)
    navbarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Only close menu if it's currently open (mobile view)
            if (mobileMenu.classList.contains('is-active')) {
                closeMobileMenu();
            }
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        const isClickInsideNav = e.target.closest('.navbar');
        
        if (!isClickInsideNav && mobileMenu.classList.contains('is-active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize - close mobile menu if window becomes large
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('is-active')) {
                closeMobileMenu();
            }
        }, 250);
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-active')) {
            closeMobileMenu();
        }
    });

    // Handle dropdown toggle
    document.querySelectorAll(".dropdown-toggle").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent bubbling

        const menu = button.nextElementSibling;

        // Close all other dropdowns first (optional)
        document.querySelectorAll(".dropdown-menu.show").forEach(openMenu => {
        if (openMenu !== menu) openMenu.classList.remove("show");
        });

        // Toggle the clicked one
        menu.classList.toggle("show");
    });
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown-menu.show").forEach(menu => {
        menu.classList.remove("show");
    });
    });

    document.querySelectorAll("[data-toggle='collapse']").forEach(button => {
    button.addEventListener("click", () => {
        const targetSelector = button.getAttribute("data-target");
        const target = document.querySelector(targetSelector);

        if (!target) return;

        // Close others if you want accordion behavior
        // document.querySelectorAll(".collapse.show").forEach(open => {
        //   if (open !== target) open.classList.remove("show");
        // });

        target.classList.toggle("show");
    });
    });

    // Auto-dismiss alerts after 4 seconds
    document.querySelectorAll(".alert").forEach(alert => {
    setTimeout(() => {
        alert.classList.add("fade-out");
        setTimeout(() => alert.remove(), 500); // remove after fade
    }, 4000);
    });

    // Manual close with "X" button
    document.querySelectorAll(".btn-close").forEach(button => {
    button.addEventListener("click", () => {
        const alert = button.closest(".alert");
        alert.classList.add("fade-out");
        setTimeout(() => alert.remove(), 500);
    });
    });

    // Add active state to current page link (optional enhancement)
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        navbarLinks.forEach(function(link) {
            link.classList.remove('active');
            
            const linkPath = new URL(link.href, window.location.origin).pathname;
            const linkHash = new URL(link.href, window.location.origin).hash;
            
            // Check if this link matches the current page
            if (currentPath === linkPath || 
                (currentHash && currentHash === linkHash) ||
                (link.getAttribute('href') === './' && (currentPath === '/' || currentPath === '/index.html'))) {
                link.classList.add('active');
            }
        });
    }

    // Set active link on page load
    setActiveLink();

    // Smooth scroll for anchor links (if any)
    navbarLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // If it's an anchor link (starts with #), add smooth scroll
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close mobile menu first
                    if (mobileMenu.classList.contains('is-active')) {
                        closeMobileMenu();
                    }
                    
                    // Smooth scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    window.history.pushState(null, null, href);
                    setActiveLink();
                }
            });
        }
    });

    // Performance optimization: Use passive event listeners where possible
    let ticking = false;
    
    function updateScrollState() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollState);
            ticking = true;
        }
    }, { passive: true });

    // Initialize any additional features
    console.log('Navigation bar initialized successfully');
});