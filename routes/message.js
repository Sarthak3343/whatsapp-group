const express = require("express");
const Message = require("../models/message");

const router = express.Router();

router.get("/:groupId", (req, res) => {
  const groupId = req.params.groupId;
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Invalid groupId" });
  }

  Message.find({ groupId: groupId })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .then((messages) => {
      res.json({ messages });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/:groupId", (req, res) => {
  const groupId = req.params.groupId;
  const senderId = req.body.senderId;
  const message = req.body.message;
  const attachments = req.body.attachments;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ error: "Invalid groupId" });
  }

  if (!senderId) {
    return res.status(400).json({ error: "SenderId is required" });
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const newMessage = new Message({
    groupId: groupId,
    senderId: senderId,
    message: message,
    timestamp: new Date(),
    attachments: attachments,
  });

  newMessage
    .save()
    .then((message) => {
      res.json({ message });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
