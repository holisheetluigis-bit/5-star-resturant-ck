# CK Restaurant - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Setup Environment Variables

Create a file named `.env` in the `backend` folder with this content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ck-restaurant
JWT_SECRET=your-secret-key-12345
NODE_ENV=development
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account and cluster
- Copy your connection string and paste in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ck-restaurant
```

### Step 4: Seed Sample Data

```bash
cd backend
node seed.js
```

### Step 5: Start the Server

```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

### Step 6: Open in Browser

Navigate to: **http://localhost:5000**

---

## 🎯 How to Use

### Create Account
1. Click the user icon (👤) in top right
2. Click "Register"
3. Fill in your details
4. Click "Register"

### Browse Menu
1. Scroll down to "Our Menu" section
2. Filter by category (Burritos, Meals, etc.)
3. Click on any item to see details

### Place an Order
1. Click item to view details
2. Adjust quantity with + and - buttons
3. Click "Add to Cart"
4. Click 🛒 icon to view cart
5. Click "Proceed to Checkout"
6. Enter delivery address
7. Choose payment method
8. Click "Place Order"

### View Your Orders
1. Click user icon (👤)
2. Click "My Orders"
3. See order history and status

---

## 🗺️ Google Maps Integration (Optional)

To enable location selection on map:

1. Go to: https://console.cloud.google.com/
2. Create a new project
3. Search for "Maps JavaScript API"
4. Click "ENABLE"
5. Create an API key (Credentials > Create Credentials > API Key)
6. In `backend/.env`, add:
   ```
   GOOGLE_MAPS_API_KEY=your-api-key-here
   ```
7. In `frontend/index.html`, find this line:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY"></script>
   ```
   Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key

---

## 📱 Test Accounts

After running `seed.js`, you can login with:

**Email:** test@example.com  
**Password:** password123

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- For MongoDB Atlas, verify username and password in connection string

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "Module not found" errors
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Google Maps not showing
- Check API key is correct in `index.html`
- Verify Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for errors (F12)

---

## 🔧 Project Structure

```
ck-restaurant-app/
├── backend/              # Express.js server
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Main server file
│   └── package.json
└── frontend/            # Website files
    ├── index.html       # Main page
    ├── css/             # Styling
    └── js/              # JavaScript files
```

---

## 📚 API Reference

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Menu
- `GET /api/menu` - Get all items
- `GET /api/menu?category=Meals` - Filter by category

### Orders
- `POST /api/orders/create` - Place order
- `GET /api/orders/user` - Get my orders

---

## 💡 Features Included

✅ User Registration & Login  
✅ Browse Restaurant Menu  
✅ Shopping Cart  
✅ Checkout & Address Entry  
✅ Order Placement  
✅ Order History & Tracking  
✅ Responsive Mobile Design  
✅ Delivery Address Management  
✅ Multiple Payment Methods  

---

## 🎨 Customization

### Change Restaurant Name
- Edit `frontend/index.html` - search for "CK RESTURANT 5 STAR"
- Edit `backend/server.js` - change database name

### Change Colors
- Edit `frontend/css/style.css` - look for `:root` variables at the top

### Change Menu Items
- Run: `node backend/seed.js` to reset with sample data
- Or use the admin panel to add items

---

## 📞 Support

**Restaurant Info:**
- Phone: +855 76 504 0211
- Location: Phnom Penh, Cambodia
- Hours: 10AM - 10PM (Mon-Sun)

---

## 🎓 Learn More

- **Express.js:** https://expressjs.com
- **MongoDB:** https://docs.mongodb.com
- **Google Maps API:** https://developers.google.com/maps/documentation
- **JWT Authentication:** https://jwt.io

---

**Happy Coding! Support Khmer Product 🇰🇭**
