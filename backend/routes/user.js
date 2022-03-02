const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ message: "Error getting users" });
  }
});
const authenticateToken = require("../utils/authenticateToken");

router.post("/register", async (req, res) => {
  // console.log(req);
  const checkUsers = await User.find({ email: req.body.email });
  if (checkUsers.length > 0) {
    res.status(200).json({ message: "User already exists" });
  } else {
    const token = jwt.sign(req.body, process.env.JWT_SECRET);
    console.log(req.body);
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: encryptedPassword,
    });
    try {
      const newUser = await user.save();
      res.status(201).json({ accessToken: token, userId: newUser._id });
    } catch {
      res.status(400).json({ message: "Error creating user" });
    }
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });
    const validPass = await bcrypt.compare(req.body.password, user[0].password);
    const token = await jwt.sign(req.body, process.env.JWT_SECRET);

    if (validPass) {
      res
        .status(200)
        .json({
          message: "authenticated",
          userId: user[0]._id,
          accessToken: token,
        });
    } else {
      res.status(200).json({ message: "not authenticated" });
    }
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
});
module.exports = router;
