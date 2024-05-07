const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.error("Error creating order:", error);
				return res.status(500).json({ message: "Failed to create order" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		console.error("Internal server error:", error);
		res.status(500).json({ message: "Internal Server Error!" });
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			const { order_id, amount, firstName, phoneNumber, email } = req.body;

			const Payment = require("../models/paymenModel");

			const payment = new Payment({
				firstName,
				email,
				phoneNumber,
				order_id,
				amount,
				razorpay_order_id,
				razorpay_payment_id,
				razorpay_signature,
				payment_status: "success",
			});

			await payment.save();

			return res.status(200).json({ message: "Payment verified and saved to database successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		console.error("Internal server error:", error);
		res.status(500).json({ message: "Internal Server Error!" });
	}
});



module.exports = router;
