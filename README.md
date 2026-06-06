# CK Restaurant 5 Star - Full Stack Web Application

A complete full-stack restaurant ordering system with user authentication, shopping cart, payment processing, and delivery tracking.

## Features

✅ **User Authentication**
- User registration and login
- Secure password encryption with bcryptjs
- JWT token-based authentication
- User profile management

✅ **Menu Management**
- Browse restaurant menu by categories
- View detailed item information with ratings
- Filter items by category (Burritos, Meals, Beverages, Desserts)

✅ **Shopping Cart**
- Add/remove items from cart
- Adjust quantities
- Real-time cart count updates
- Persistent cart storage

✅ **Checkout System**
- Delivery address collection
- Manual address input
- Google Maps integration for location selection
- Order summary and review

✅ **Payment Processing**
- Multiple payment methods (Credit Card, Cash on Delivery)
- Order confirmation with order ID
- Order history and tracking

✅ **Delivery Management**
- Real-time order status tracking
- Estimated delivery time
- Delivery address management
- Order history with status updates

✅ **Responsive Design**
- Mobile-first design
- Works on all devices (desktop, tablet, mobile)
- Touch-friendly interface
- Modern and attractive UI

## Project Structure

```
ck-restaurant-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Menu.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── menu.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── payment.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   └── js/
│       ├── app.js
│       ├── auth.js
│       ├── menu.js
│       ├── cart.js
│       └── checkout.js
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Google Maps API Key (for location features)
- npm or yarn

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ck-restaurant
JWT_SECRET=your-secret-key-here
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 2. Start MongoDB

Make sure MongoDB is running:

```bash
# On Windows (if MongoDB is installed locally)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

### 3. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

### 4. Start Backend Server

```bash
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

The frontend is already configured to run with the backend API at `http://localhost:5000/api`

Open the frontend by navigating to:
```
http://localhost:5000/
```

## Usage

### User Registration & Login

1. Click the user icon in the navbar
2. Click "Register" to create a new account
3. Fill in your details (name, email, password)
4. Your account is created and you're automatically logged in

### Browsing Menu

1. Browse the restaurant menu with categories
2. Filter by category (Burritos, Meals, Beverages, Desserts)
3. Click on any item to see details
4. Adjust quantity and add to cart

### Ordering

1. Click the shopping cart icon to view your cart
2. Review items and quantities
3. Click "Proceed to Checkout"
4. Enter or select delivery address
5. Choose payment method
6. Place order

### Tracking Orders

1. Click user icon → "My Orders"
2. View all your orders with status
3. Track estimated delivery time

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=Meals` - Get items by category
- `GET /api/menu/:id` - Get single item
- `POST /api/menu` - Add new menu item (admin)

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/user` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

### Payment
- `POST /api/payment/create-payment-intent` - Create payment
- `POST /api/payment/confirm-payment` - Confirm payment

### Cart
- `POST /api/cart/calculate-delivery` - Calculate delivery fee

## Configuration

### Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Maps JavaScript API
4. Create an API key
5. Add the key to:
   - Backend `.env` file: `GOOGLE_MAPS_API_KEY=your-key`
   - Frontend `index.html`: Replace `YOUR_GOOGLE_MAPS_API_KEY`

### Database Configuration

#### MongoDB Local
```
MONGODB_URI=mongodb://localhost:27017/ck-restaurant
```

#### MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ck-restaurant
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Secure HTTP headers with CORS
- Input validation and sanitization

## Future Enhancements

- 🚀 Real Stripe payment integration
- 📊 Admin dashboard for orders and analytics
- 👨‍💼 Delivery tracking with real-time location
- ⭐ Review and rating system
- 📱 Mobile app (React Native/Flutter)
- 🔔 Push notifications for order updates
- 💬 Live chat support
- 🎁 Loyalty points and coupons system

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongosh`
- Verify MONGODB_URI in .env file
- Check MongoDB credentials if using Atlas

### Google Maps Not Loading
- Verify API key is correct
- Check if Maps JavaScript API is enabled
- Ensure API key has no restrictions

### CORS Errors
- Backend CORS is enabled for all origins (configure in production)
- Frontend API_URL must match backend URL

### Cart Not Saving
- Check browser localStorage is enabled
- Clear browser cache and try again

## Deployment

### Backend (Heroku)
```bash
cd backend
heroku login
heroku create your-app-name
git push heroku main
```

### Frontend (Netlify/Vercel)
```bash
# Update API_URL in app.js to production backend URL
netlify deploy --prod
```

## Support

For issues or questions, contact:
- Phone: +855 76 504 0211
- Email: support@ckrestaurant.com
- Facebook: Cockroach Ck

## License

MIT License - feel free to use this project

## Credits

- Khmer Product Support
- CK Restaurant 5 Star Team
- Built with Node.js, Express, MongoDB, and Vanilla JavaScript

---

**Support Khmer Product! 🇰🇭**
