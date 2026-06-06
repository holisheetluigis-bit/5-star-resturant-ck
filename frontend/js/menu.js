// Menu Functions

let currentFilter = 'all';
let currentItemId = null;
let currentItemQuantity = 1;

// Sample menu items (in production, these come from the database)
const sampleMenuItems = [
    {
        _id: '1',
        name: 'Burrito Cambodian Style',
        description: 'Authentic Cambodian burrito with traditional spices and fresh ingredients',
        price: 8.99,
        category: 'Burrito',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b00b7da?w=300&h=200&fit=crop',
        available: true,
        rating: 4.7
    },
    {
        _id: '2',
        name: 'Big Bowl Full Option',
        description: 'Large bowl with meat, vegetables, and special sauce',
        price: 12.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
        available: true,
        rating: 4.8
    },
    {
        _id: '3',
        name: 'Magic Matcha Latte',
        description: 'Creamy matcha latte with premium quality matcha powder',
        price: 5.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1577318154e3fe0101d4de73e9d6f1a2?w=300&h=200&fit=crop',
        available: true,
        rating: 4.5
    },
    {
        _id: '4',
        name: 'Khmer Coffee',
        description: 'Traditional Cambodian iced coffee with condensed milk',
        price: 3.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop',
        available: true,
        rating: 4.6
    },
    {
        _id: '5',
        name: 'Fried Rice with Chicken',
        description: 'Fragrant fried rice with chicken, eggs, and seasonal vegetables',
        price: 9.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1631082927389-03006ccad8c7?w=300&h=200&fit=crop',
        available: true,
        rating: 4.7
    },
    {
        _id: '6',
        name: 'Beef Burrito Deluxe',
        description: 'Premium beef burrito with avocado, cheese, and special sauce',
        price: 11.99,
        category: 'Burrito',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b00b7da?w=300&h=200&fit=crop',
        available: true,
        rating: 4.9
    },
    {
        _id: '7',
        name: 'Pad Thai Chicken',
        description: 'Traditional Thai noodles with chicken and peanut sauce',
        price: 10.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1559314014-9a861f4c04d9?w=300&h=200&fit=crop',
        available: true,
        rating: 4.6
    },
    {
        _id: '8',
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with creamy chocolate frosting',
        price: 6.99,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
        available: true,
        rating: 4.8
    }
];

async function loadMenuItems() {
    try {
        // In production, this would fetch from the API
        // const response = await fetch(`${API_URL}/menu`);
        // const items = await response.json();
        
        // For now, using sample data
        const items = sampleMenuItems;
        
        localStorage.setItem('menuItems', JSON.stringify(items));
        displayMenuItems(items);
    } catch (error) {
        console.error('Error loading menu:', error);
        // Fallback to sample data
        displayMenuItems(sampleMenuItems);
    }
}

function displayMenuItems(items) {
    let filteredItems = items;

    if (currentFilter !== 'all') {
        filteredItems = items.filter(item => item.category === currentFilter);
    }

    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-card" onclick="showItemDetails('${item._id}')">
            <div class="menu-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function filterMenu(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load and display filtered items
    const items = JSON.parse(localStorage.getItem('menuItems')) || sampleMenuItems;
    displayMenuItems(items);
}

function showItemDetails(itemId) {
    const items = JSON.parse(localStorage.getItem('menuItems')) || sampleMenuItems;
    const item = items.find(i => i._id === itemId);

    if (!item) return;

    currentItemId = itemId;
    currentItemQuantity = 1;

    document.getElementById('itemImage').src = item.image;
    document.getElementById('itemName').textContent = item.name;
    document.getElementById('itemDescription').textContent = item.description;
    document.getElementById('itemPrice').textContent = '$' + item.price.toFixed(2);
    document.getElementById('itemRating').textContent = item.rating;
    document.getElementById('quantity').textContent = '1';

    document.getElementById('itemModal').classList.remove('hidden');
}

function increaseQuantity() {
    currentItemQuantity++;
    document.getElementById('quantity').textContent = currentItemQuantity;
}

function decreaseQuantity() {
    if (currentItemQuantity > 1) {
        currentItemQuantity--;
        document.getElementById('quantity').textContent = currentItemQuantity;
    }
}

function addToCart() {
    if (!currentItemId) return;

    const items = JSON.parse(localStorage.getItem('menuItems')) || sampleMenuItems;
    const item = items.find(i => i._id === currentItemId);

    if (!item) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in cart
    const existingItem = cart.find(i => i._id === currentItemId);

    if (existingItem) {
        existingItem.quantity += currentItemQuantity;
    } else {
        cart.push({
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: currentItemQuantity,
            image: item.image
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${item.name} added to cart!`);
    updateCartCount();

    // Close modal
    document.getElementById('itemModal').classList.add('hidden');
}
