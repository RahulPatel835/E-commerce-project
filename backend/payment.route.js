require('dotenv').config();
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});


router.post('/orders/:amt', async (req, res) => {
    try {
        const options = {
            amount: req.params.amt,
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 100000)}`
        };

        const order = await razorpayInstance.orders.create(options);
        if (!order) return res.status(500).send('Some error occurred');
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).send('Some error occurred');
    }
});

// Route for handling payment success
router.post('/success', async (req, res) => {
    res.send('Payment successfully done');
});

module.exports = router;
