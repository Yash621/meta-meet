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
  const checkUsers = await User.find({ username: req.body.username });
  if (checkUsers.length > 0) {
    res.status(200).json({ message: "User already exists" });
  } else {
    const token = jwt.sign(
      req.body,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
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
    const user = await User.find({ username: req.body.username });
    const validPass = await bcrypt.compare(req.body.password, user[0].password);
    const token = await jwt.sign(
      req.body,
      process.env.ACCESS_TOKEN_SECRET,
    );
    if (validPass) {
      res.status(200).json({
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
router.get("/search", async (req, res) => {
  try {
    const users = [];
    const registeredUsers = await User.find({});
    registeredUsers.forEach((user) => {
      if (req.query.id != user.id) {
        if (user.username.includes(req.query.filter)) {
          users.push(user);
        }
      }
    });
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
});
router.get("/id", async (req, res) => {
  try {
    const user = await User.find({ username: req.query.username });
    res.status(200).json(user[0].id);
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
});
router.get("/username", async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    res.status(200).json(user.username);
  } catch {
    res.status(500).json({ message: "Error getting user" });
  }
});

module.exports = router;
