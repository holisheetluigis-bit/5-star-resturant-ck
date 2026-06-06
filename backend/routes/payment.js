const express = require('express');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Create payment intent (Stripe integration)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const { orderId, amount } = req.body;

    // Verify order exists
    const order = await Order.findById(orderId);
    if (!order || order.userId.toString() !== decoded.userId) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // In production, integrate with Stripe
    // For now, return a mock payment intent
    const paymentIntent = {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      amount: Math.round(amount * 100),
      currency: 'usd',
      status: 'requires_payment_method'
    };

    res.json({
      message: 'Payment intent created',
      paymentIntent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const { orderId } = req.body;

    // Update order payment status
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'Completed',
        status: 'Confirmed',
        stripePaymentId: 'pi_' + Math.random().toString(36).substr(2, 9)
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      message: 'Payment confirmed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
