const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Send a message (POST)
router.post("/send", async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;
    
    // Create and save new message
    const newMessage = new Message({ sender, recipient, message });
    await newMessage.save();
    
    // Send success response
    res.status(200).json({ message: "Message sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Get all messages for a user (GET)
router.get("/:userId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId },
        { recipient: req.params.userId }
      ]
    });
    
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve messages!" });
  }
});

module.exports = router;
