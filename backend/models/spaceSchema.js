const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  spacename: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model("spaces", spaceSchema);
