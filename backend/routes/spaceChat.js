const express = require("express");
const router = express.Router();
const spaceChat = require("../models/spaceChatSchema");

router.post("/add", async (req, res) => {
  try {
    const newSpaceChat = new spaceChat({
      username: req.body.username,
      message: req.body.message,
      time: req.body.time,
      space: req.body.space,
      id: req.body.id,
    });
    await newSpaceChat.save();
    res.status(201).json({
      msg: "Space Chat Added",
    });
  } catch {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/chats", async (req, res) => {
  const chats = await spaceChat.find({ space: req.query.space });
  res.status(200).json(chats);
});

module.exports = router;
