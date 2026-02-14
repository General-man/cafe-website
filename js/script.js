/* -----------------------------------------------------------
   URBAN ROAST CO. - MAIN SCRIPT & CART LOGIC
----------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Animation Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 100,
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true
        });
    }

    // --- 2. Navigation & UI Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 0";
        }
    });

    // --- 3. Dark Mode Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if(icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 4. CART SYSTEM LOGIC ---

    let cart = [];
    
    // DOM Elements
    const cartTrigger = document.getElementById('cart-trigger');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const cartCountElement = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Open/Close Cart
    function toggleCart() {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }

    if(cartTrigger) cartTrigger.addEventListener('click', toggleCart);
    if(closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if(cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Add to Cart Function
    window.addToCart = (id, name, price) => {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        
        updateCartUI();
        // Open cart automatically to show feedback
        if(!cartSidebar.classList.contains('open')) toggleCart();
    };

    // Remove/Decrease Item
    window.changeQty = (id, change) => {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex > -1) {
            cart[itemIndex].qty += change;
            
            if (cart[itemIndex].qty <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartUI();
    };

    // Render Cart HTML & Update Totals
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalCount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center" style="margin-top:20px;">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                totalCount += item.qty;

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.qty}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="btn-qty" onclick="changeQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="btn-qty" onclick="changeQty('${item.id}', 1)">+</button>
                        <div style="font-weight:bold; margin-left:10px;">$${itemTotal.toFixed(2)}</div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        cartTotalElement.innerText = `$${total.toFixed(2)}`;
        cartCountElement.innerText = totalCount;
    }

    // Checkout (WhatsApp)
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return alert("Your cart is empty!");

            let message = "Hi Urban Roast Co, I'd like to place an order:%0A%0A";
            let total = 0;

            cart.forEach(item => {
                message += `- ${item.qty}x ${item.name} ($${(item.price * item.qty).toFixed(2)})%0A`;
                total += item.price * item.qty;
            });

            message += `%0A*Total Order Value: $${total.toFixed(2)}*`;
            message += "%0A%0APlease confirm my order.";

            window.open(`https://wa.me/919370569122?text=${message}`, '_blank');
        });
    }
});
