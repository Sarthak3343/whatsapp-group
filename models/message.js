const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  attachments: [
    {
      type: String,
      url: String
    }
  ]
});

module.exports = mongoose.model("Message", messageSchema);
