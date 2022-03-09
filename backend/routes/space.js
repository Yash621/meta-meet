const express = require("express");
const router = express.Router();
const Space = require("../models/spaceSchema");
const ChatSpaces = require("../models/chatSpacesSchema");

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const spaces = await Space.find({ spacename: req.body.spacename });
    if (spaces.length > 0) {
      console.log(spaces + " already exists");
      res.status(200).json({ message: "Space already exists" });
    } else {
      console.log(spaces + " does not exist");
      const space = new Space({
        spacename: req.body.spacename,
        members: req.body.members,
        chats: [],
      });
      const existingChatSpaces = await ChatSpaces.find({
        userId: req.body.members[0],
      });
      if (existingChatSpaces.length > 0) {
        const newSpaceSet = existingChatSpaces[0].spaces;
        newSpaceSet.push(req.body.spacename);
        existingChatSpaces[0].spaces = newSpaceSet;
        await existingChatSpaces[0].save();
      } else {
        const chatSpace = new ChatSpaces({
          userId: req.body.members[0],
          spaces: [req.body.spacename],
        });
        const newChatSpace = await chatSpace.save();
      }
      const newSpace = await space.save();
      res.status(201).json({ message: "Space created" });
    }
  } catch {
    res.status(500).json({ message: "Error creating space" });
  }
});

router.get("/getSpaces", async (req, res) => {
  try {
    console.log(req.query.userId);
    const spaces = await ChatSpaces.find({ userId: req.query.userId });
    console.log(spaces[0] + " spaces found");
    res.status(200).json({ spaces: spaces[0].spaces });
  } catch {
    res.status(500).json({ message: "Error fetching spaces" });
  }
});
router.post("/addmember", async (req, res) => {
  try {
    const existingChatSpaces = await ChatSpaces.find({
      userId: req.body.userId,
    });
    const space = await Space.find({ spacename: req.body.spacename });
    const newMemeberList = space[0].members;
    newMemeberList.push(req.body.userId);
    space[0].members = newMemeberList;
    const newSpace = await space[0].save();
    if (existingChatSpaces.length > 0) {
      const newSpaceSet = existingChatSpaces[0].spaces;
      newSpaceSet.push(req.body.spacename);
      existingChatSpaces[0].spaces = newSpaceSet;
      await existingChatSpaces[0].save();
    } else {
      const chatSpace = new ChatSpaces({
        userId: req.body.userId,
        spaces: [req.body.spacename],
      });
      const newChatSpace = await chatSpace.save();
    }
    res.status(200).json({ message: "member added" });
  } catch {
    res.status(500).json({ message: "Error adding member" });
  }
});
router.get("/", async (req, res) => {
  try {
    const spaces = await Space.find({});
    console.log(spaces + " spaces found");
    res.status(200).json({ spaces });
  } catch {
    res.status(500).json({ message: "Error fetching spaces" });
  }
});
router.get("/memberExist", async (req, res) => {
  try {
    const chatSpace = await ChatSpaces.find({ userId: req.query.userId });
    if (chatSpace.length > 0) {
      if (chatSpace[0].spaces.includes(req.query.space)) {
        res.status(200).json({ message: "member exists" });
      } else {
        res.status(200).json({ message: "member does not exists" });
      }
    } else {
      res.status(200).json({ message: "member does not exists" });
    }
  } catch {
    res.status(500).json({ message: "Error fetching spaces" });
  }
});
module.exports = router;
