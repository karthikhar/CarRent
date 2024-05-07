const express = require('express');
const UserModel = require('../models/user');
const router = express.Router();

router.get('/api/profile/:user_Id', async (req, res) => {
  try {
    const  _Id = req.params.user_Id;
    const user = await UserModel.findById(_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
