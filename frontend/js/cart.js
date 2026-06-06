// Cart Functions

const DELIVERY_FEE = 2.99;

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 20px; color: #999;">Your cart is empty</p>';
        document.querySelector('.btn.btn-primary').disabled = true;
        updateCartTotals(0, 0);
        return;
    }

    document.querySelector('.btn.btn-primary').disabled = false;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div style="flex: 1;">
                <div class="cart-item-name">${item.name}</div>
                <small style="color: #999;">Qty: ${item.quantity}</small>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');

    updateCartTotals(calculateSubtotal(cart), DELIVERY_FEE);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemName = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
    showNotification(`${itemName} removed from cart`);
}

function calculateSubtotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartTotals(subtotal, deliveryFee) {
    const total = subtotal + deliveryFee;
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('deliveryFee').textContent = '$' + deliveryFee.toFixed(2);
    document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);

    // Also update checkout totals
    document.getElementById('checkoutSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkoutDeliveryFee').textContent = '$' + deliveryFee.toFixed(2);
    document.getElementById('checkoutTotal').textContent = '$' + total.toFixed(2);
}

function proceedToCheckout() {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('Please login first to checkout');
        document.getElementById('cartModal').classList.add('hidden');
        document.getElementById('authModal').classList.remove('hidden');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showAlert('Your cart is empty');
        return;
    }

    // Close cart modal and open checkout modal
    document.getElementById('cartModal').classList.add('hidden');
    document.getElementById('checkoutModal').classList.remove('hidden');

    // Load user's address if available
    loadUserAddressToCheckout();
    updateCheckoutTotals();
}

async function loadUserAddressToCheckout() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const user = await response.json();

        if (response.ok) {
            if (user.address) document.getElementById('deliveryStreet').value = user.address;
            if (user.city) document.getElementById('deliveryCity').value = user.city;
            if (user.zipcode) document.getElementById('deliveryZipcode').value = user.zipcode;
        }
    } catch (error) {
        console.error('Error loading address:', error);
    }
}

function switchCheckoutTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.checkout-tab').forEach(t => {
        t.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

function updateCheckoutTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = calculateSubtotal(cart);
    const total = subtotal + DELIVERY_FEE;

    document.getElementById('checkoutSubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkoutDeliveryFee').textContent = '$' + DELIVERY_FEE.toFixed(2);
    document.getElementById('checkoutTotal').textContent = '$' + total.toFixed(2);
}

async function placeOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('Please login first');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showAlert('Your cart is empty');
        return;
    }

    const street = document.getElementById('deliveryStreet').value.trim();
    const city = document.getElementById('deliveryCity').value.trim();
    const zipcode = document.getElementById('deliveryZipcode').value.trim();

    if (!street || !city || !zipcode) {
        showAlert('Please fill in all delivery address fields');
        return;
    }

    const subtotal = calculateSubtotal(cart);
    const totalAmount = subtotal + DELIVERY_FEE;

    try {
        const response = await fetch(`${API_URL}/orders/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                items: cart,
                totalAmount: totalAmount,
                deliveryAddress: {
                    street,
                    city,
                    zipcode
                },
                deliveryFee: DELIVERY_FEE
            })
        });

        const data = await response.json();

        if (response.ok) {
            const orderId = data.order._id;
            
            // Process payment
            const paymentResponse = await fetch(`${API_URL}/payment/confirm-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: orderId
                })
            });

            if (paymentResponse.ok) {
                // Clear cart
                localStorage.removeItem('cart');
                updateCartCount();

                // Show confirmation
                showOrderConfirmation(orderId, totalAmount);

                // Close checkout modal
                document.getElementById('checkoutModal').classList.add('hidden');
            }
        } else {
            showAlert(data.error || 'Failed to place order');
        }
    } catch (error) {
        showAlert('Error: ' + error.message);
    }
}

function showOrderConfirmation(orderId, totalAmount) {
    document.getElementById('orderId').textContent = orderId.substring(0, 12);
    document.getElementById('confirmationTotal').textContent = '$' + totalAmount.toFixed(2);
    document.getElementById('confirmationModal').classList.remove('hidden');
}

function goToOrders() {
    document.getElementById('confirmationModal').classList.add('hidden');
    loadUserOrders();
    document.getElementById('ordersModal').classList.remove('hidden');
}

// Initialize cart totals on load
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartTotals(calculateSubtotal(cart), DELIVERY_FEE);
});
