const express = require("express");
const router = express.Router();
const Space = require("../models/spaceSchema");

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
      const newSpace = await space.save();
      res.status(201).json({ message: "Space created" });
    }
  } catch {
    res.status(500).json({ message: "Error creating space" });
  }
});

module.exports = router;
