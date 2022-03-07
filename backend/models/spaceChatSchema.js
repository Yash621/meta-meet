const mongoose = require("mongoose");

const spaceChatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  space: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("spacechats", spaceChatSchema);
