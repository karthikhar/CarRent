const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Assuming you have a model named 'YourModel'
const carModel = require('../models/Cars');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ani:ani@cluster0.gcwgnkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a route to retrieve data
router.get('/data', async (req, res) => {
    try {
        // Retrieve data from the database
        const data = await carModel.find();

        // Send the retrieved data as response
        res.json(data);
    } catch (err) {
        // If there's an error, send an error response
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
