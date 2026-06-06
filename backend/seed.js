const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const User = require('../models/User');
require('dotenv').config();

const sampleMenuItems = [
    {
        name: 'Burrito Cambodian Style',
        description: 'Authentic Cambodian burrito with traditional spices and fresh ingredients',
        price: 8.99,
        category: 'Burrito',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b00b7da?w=300&h=200&fit=crop',
        available: true,
        rating: 4.7
    },
    {
        name: 'Big Bowl Full Option',
        description: 'Large bowl with meat, vegetables, and special sauce',
        price: 12.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
        available: true,
        rating: 4.8
    },
    {
        name: 'Magic Matcha Latte',
        description: 'Creamy matcha latte with premium quality matcha powder',
        price: 5.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1577318154e3fe0101d4de73e9d6f1a2?w=300&h=200&fit=crop',
        available: true,
        rating: 4.5
    },
    {
        name: 'Khmer Coffee',
        description: 'Traditional Cambodian iced coffee with condensed milk',
        price: 3.99,
        category: 'Beverages',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop',
        available: true,
        rating: 4.6
    },
    {
        name: 'Fried Rice with Chicken',
        description: 'Fragrant fried rice with chicken, eggs, and seasonal vegetables',
        price: 9.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1631082927389-03006ccad8c7?w=300&h=200&fit=crop',
        available: true,
        rating: 4.7
    },
    {
        name: 'Beef Burrito Deluxe',
        description: 'Premium beef burrito with avocado, cheese, and special sauce',
        price: 11.99,
        category: 'Burrito',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b00b7da?w=300&h=200&fit=crop',
        available: true,
        rating: 4.9
    },
    {
        name: 'Pad Thai Chicken',
        description: 'Traditional Thai noodles with chicken and peanut sauce',
        price: 10.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1559314014-9a861f4c04d9?w=300&h=200&fit=crop',
        available: true,
        rating: 4.6
    },
    {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with creamy chocolate frosting',
        price: 6.99,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
        available: true,
        rating: 4.8
    },
    {
        name: 'Vegetable Burrito',
        description: 'Fresh vegetables with beans and quinoa in a whole wheat tortilla',
        price: 7.99,
        category: 'Burrito',
        image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b00b7da?w=300&h=200&fit=crop',
        available: true,
        rating: 4.5
    },
    {
        name: 'Fish Curry',
        description: 'Spicy fish curry with coconut milk and fresh vegetables',
        price: 13.99,
        category: 'Meal',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
        available: true,
        rating: 4.7
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ck-restaurant');
        console.log('MongoDB connected');

        // Clear existing data
        await Menu.deleteMany({});
        console.log('Cleared existing menu items');

        // Insert sample menu items
        const insertedItems = await Menu.insertMany(sampleMenuItems);
        console.log(`${insertedItems.length} menu items added successfully`);

        // Create a test user
        const testUser = new User({
            name: 'John Doe',
            email: 'test@example.com',
            password: 'password123',
            phone: '+1234567890',
            address: '123 Main St',
            city: 'Phnom Penh',
            zipcode: '12156'
        });

        await testUser.save();
        console.log('Test user created successfully');

        console.log('\n✅ Database seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
