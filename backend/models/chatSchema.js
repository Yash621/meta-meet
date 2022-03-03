const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  readstatus: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reciever: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("chats", chatSchema);
