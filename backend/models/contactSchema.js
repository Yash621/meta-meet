const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("contacts", contactSchema);
