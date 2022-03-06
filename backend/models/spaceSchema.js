const mongoose = require("mongoose");

const spaceChat = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const spaceSchema = new mongoose.Schema({
  spacename: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  chats: {
    type: [spaceChat],
    required: true,
  },
});
module.exports = mongoose.model("spaces", spaceSchema);
