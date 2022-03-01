const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Error getting users" });
  }
});

router.post("/create", async (req, res) => {
  const user = new User({ email: req.body.email, password: req.body.password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch {
    res.status(400).json({ message: "Error creating user" });
  }
});
module.exports = router;
