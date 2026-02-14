/* -----------------------------------------------------------
   URBAN ROAST CO. - MAIN SCRIPT
----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Animation on Scroll (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 100,
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true
        });
    }

    // 2. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: for animating hamburger icon
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 0";
        }
    });

    // 4. Dark Mode Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Toggle Icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // 5. WhatsApp Integration Dynamic Message (Optional Enhancement)
    // If you want to dynamically add items to the message based on clicks in the future
    const orderButtons = document.querySelectorAll('.add-to-cart'); // Example class
    
    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = btn.dataset.item;
            const message = `Hi Urban Roast, I'd like to order a ${itemName}.`;
            const url = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });

});
