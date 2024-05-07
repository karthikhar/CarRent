const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  phoneNumber: Number,
  order_id: String,
  amount: Number,
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  carId:String
});

const PaymentModel = mongoose.model("payments", PaymentSchema);

module.exports = PaymentModel;
