const express = require('express');
const Menu = require('../models/Menu');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let query = { available: true };
    
    if (category) {
      query.category = category;
    }

    const items = await Menu.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add menu item (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const newItem = new Menu({ name, description, price, category, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
