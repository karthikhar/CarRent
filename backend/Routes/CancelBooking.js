const express = require('express');
const router = express.Router();
const Cars = require('../models/Cars');

router.put('/bookings/:id/cancel', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const car = await Cars.findById(bookingId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.isBooked = false; 
    await car.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
