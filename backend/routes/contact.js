const express = require("express");
const router = express.Router();
const Contact = require("../models/contactSchema");

router.post("/add", async (req, res) => {
  try {
    const contact = new Contact({
      username: req.body.username,
      id: req.body.id,
    });
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch {
    res.status(500).json({ message: "Error creating contact" });
  }
});
router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find({ id: req.params.id });
    res.status(200).json(contacts);
  } catch {
    res.status(500).json({ message: "Error getting contacts" });
  }
});
