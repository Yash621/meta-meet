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

module.exports = router;
