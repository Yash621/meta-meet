const express = require("express");
const router = express.Router();
const Contact = require("../models/contactSchema");

router.post("/add", async (req, res) => {
  try {
    const contact = new Contact({
      username: req.body.username,
      id: req.body.id,
    });
    const otherContact = new Contact({
      username: req.body.myUsername,
      id: req.body.senderId,
    });
    const newContact = await contact.save();
    const newOtherContact = await otherContact.save();
    res.status(201).json(newContact);
  } catch {
    res.status(500).json({ message: "Error creating contact" });
  }
});
router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find({ id: req.query.id });
    res.status(200).json(contacts);
  } catch {
    res.status(500).json({ message: "Error getting contacts" });
  }
});

module.exports = router;
