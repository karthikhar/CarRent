// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/user");
const multer = require("multer");
const path = require("path");
const CarModel = require("./models/Cars");
const Cardetails = require("./Routes/Cardetails")
const paymentRoutes = require("./Routes/payment");
const Report = require("./Routes/Report")
const Profile = require('./Routes/Profile');
const Search = require("./Routes/Search")


require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

mongoose.connect("mongodb+srv://ani:ani@cluster0.gcwgnkm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
  destination:'../public/carimages',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/carform', upload.single('carImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const {
      brand,
      rating,
      carName,
      model,
      kilometerPerLitre,
      gps,
      seatType,
      transmissionType,
      pricePerDay,
      description
    } = req.body;

    const carImagePath="./carimages/"+ req.file.filename;
    const newCar = await CarModel.create({
      carImagePath: carImagePath,
      brand,
      rating,
      carName,
      model,
      kilometerPerLitre,
      gps,
      seatType,
      transmissionType,
      pricePerDay,
      description
    });

    res.status(201).json({ message: 'Form submitted successfully', car: newCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.use(Cardetails);

app.use("/api/payment/", paymentRoutes); 

app.use( Profile);

app.use(Report)

app.use(Search);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.json({ message: "Success", user: { _id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});





app.post("/adminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const Adminemail = process.env.ADMIN_EMAIL;
    const AdminPassword = process.env.ADMIN_PASSWORD;
    
    if (email !== Adminemail || password !== AdminPassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ message: "Success", user: { email: Adminemail } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, username} = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ email, password: hashedPassword, username });
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
