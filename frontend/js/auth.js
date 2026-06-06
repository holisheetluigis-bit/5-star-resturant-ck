// Authentication Functions

function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.classList.toggle('active');
    registerForm.classList.toggle('active');
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showAlert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showNotification('Login successful!');
            document.getElementById('authModal').classList.add('hidden');
            checkAuthStatus();
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showAlert(data.error || 'Login failed');
        }
    } catch (error) {
        showAlert('Error: ' + error.message);
    }
}

async function handleRegister() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmPassword })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showNotification('Registration successful!');
            document.getElementById('authModal').classList.add('hidden');
            checkAuthStatus();
            // Clear form
            document.getElementById('registerName').value = '';
            document.getElementById('registerEmail').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        } else {
            showAlert(data.error || 'Registration failed');
        }
    } catch (error) {
        showAlert('Error: ' + error.message);
    }
}

async function loadUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('Please login first');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const user = await response.json();

        if (response.ok) {
            document.getElementById('profileName').value = user.name || '';
            document.getElementById('profileEmail').value = user.email || '';
            document.getElementById('profilePhone').value = user.phone || '';
            document.getElementById('profileAddress').value = user.address || '';
            document.getElementById('profileCity').value = user.city || '';
            document.getElementById('profileZipcode').value = user.zipcode || '';
        }
    } catch (error) {
        showAlert('Error loading profile: ' + error.message);
    }
}

async function updateProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('Please login first');
        return;
    }

    const name = document.getElementById('profileName').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    const address = document.getElementById('profileAddress').value.trim();
    const city = document.getElementById('profileCity').value.trim();
    const zipcode = document.getElementById('profileZipcode').value.trim();

    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, phone, address, city, zipcode })
        });

        const data = await response.json();

        if (response.ok) {
            showNotification('Profile updated successfully!');
            document.getElementById('profileModal').classList.add('hidden');
        } else {
            showAlert(data.error || 'Update failed');
        }
    } catch (error) {
        showAlert('Error: ' + error.message);
    }
}

async function loadUserOrders() {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('Please login first');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/orders/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const orders = await response.json();

        if (response.ok) {
            displayUserOrders(orders);
        }
    } catch (error) {
        showAlert('Error loading orders: ' + error.message);
    }
}

function displayUserOrders(orders) {
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; padding: 20px;">No orders yet</p>';
        return;
    }

    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Order #${order._id.substring(0, 8)}</span>
                <span class="order-status status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
            </div>
            <div class="order-details">
                <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: ${order.paymentStatus}</p>
            </div>
            <div class="order-items">
                ${order.items.map(item => `<p>• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`).join('')}
            </div>
            <div class="order-total">
                Total: $${order.totalAmount.toFixed(2)}
            </div>
        </div>
    `).join('');
}
