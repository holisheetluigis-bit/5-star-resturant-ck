// API Base URL
const API_URL = 'http://localhost:5000/api';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadMenuItems();
    checkAuthStatus();
    setupEventListeners();
});

function initializeApp() {
    console.log('CK Restaurant App Initialized');
    // Load initial data
    loadMenuItems();
    updateCartCount();
}

function setupEventListeners() {
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.add('hidden');
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('hidden');
        updateCartDisplay();
    });

    // User menu button
    document.getElementById('userMenuBtn').addEventListener('click', () => {
        const menu = document.getElementById('userMenu');
        menu.classList.toggle('hidden');
    });

    // Close user menu when clicking outside
    document.addEventListener('click', (e) => {
        const userMenu = document.getElementById('userMenu');
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (!userMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });

    // Payment method change
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cardPayment = document.getElementById('cardPayment');
            if (e.target.value === 'card') {
                cardPayment.style.display = 'block';
            } else {
                cardPayment.style.display = 'none';
            }
        });
    });
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const profileBtn = document.getElementById('profileBtn');
    const ordersBtn = document.getElementById('ordersBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (token) {
        // User is logged in
        loginBtn.classList.add('hidden');
        registerBtn.classList.add('hidden');
        profileBtn.classList.remove('hidden');
        ordersBtn.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        // User is not logged in
        loginBtn.classList.remove('hidden');
        registerBtn.classList.remove('hidden');
        profileBtn.classList.add('hidden');
        ordersBtn.classList.add('hidden');
        logoutBtn.classList.add('hidden');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `success-message`;
    notification.textContent = message;
    document.body.insertAdjacentElement('afterbegin', notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Logout handler
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        checkAuthStatus();
        location.reload();
    });

    document.getElementById('loginBtn')?.addEventListener('click', () => {
        document.getElementById('authModal').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('active');
        document.getElementById('registerForm').classList.remove('active');
    });

    document.getElementById('registerBtn')?.addEventListener('click', () => {
        document.getElementById('authModal').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('active');
        document.getElementById('loginForm').classList.remove('active');
    });

    document.getElementById('profileBtn')?.addEventListener('click', () => {
        loadUserProfile();
        document.getElementById('profileModal').classList.remove('hidden');
    });

    document.getElementById('ordersBtn')?.addEventListener('click', () => {
        loadUserOrders();
        document.getElementById('ordersModal').classList.remove('hidden');
    });
});

function showAlert(message, type = 'info') {
    alert(message);
}
