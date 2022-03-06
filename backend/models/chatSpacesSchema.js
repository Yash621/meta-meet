const mongoose = require("mongoose");

const chatSpaceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  spaces: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model("chatspaces", chatSpaceSchema);
