const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carImagePath:String,
    brand: String,
    carName: String,
    model: String,
    kilometerPerLitre: String,
    gps: String,
    transmissionType: String,
    pricePerDay: String,
    description: String,
    carId:String
  });
const CarModel = mongoose.model("cars", CarSchema)
module.exports =CarModel