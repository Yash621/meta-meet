const express = require("express");
const router = express.Router();
const Chat = require("../models/chatSchema");

router.post("/add", async (req, res) => {
  try {
    const chat = new Chat({
      sender: req.body.sender,
      readstatus: req.body.readstatus,
      message: req.body.message,
      reciever: req.body.reciever,
    });
    const newChat = await chat.save();
    res.status(201).json(newChat);
    console.log(req.body);
  } catch {
    res.status(500).json({ message: "Error creating chat" });
  }
});
router.get("/chat", async (req, res) => {
  try {
    const recievedChats = await Chat.find({
      sender: req.query.senderId,
      reciever: req.query.user,
    });
    const sentChats = await Chat.find({
      sender: req.query.userId,
      reciever: req.query.reciever,
    });
    res.status(200).json({ recievedChats, sentChats });
    // console.log(recievedChats);
    // console.log(sentChats);
  } catch {
    res.status(500).json({ message: "Error getting chats" });
  }
});

module.exports = router;
