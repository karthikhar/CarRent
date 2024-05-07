const express = require('express');
const router = express.Router();
const Car = require('../models/Cars'); 

router.get('/search', async (req, res) => {
  const {searchQuery }= req.query;
  

  try {
    const cars = await Car.find({ carName: { $regex: searchQuery, $options: 'i' } });

    res.json({ success: true, data: cars });
    
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
