const express = require('express');
const PaymentModel = require('../models/paymenModel');
const router = express.Router();

router.get('/api/rentals/report', async (req, res) => {
  try {
    const rentals = await PaymentModel.find();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
