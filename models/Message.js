const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },    // User who sent the message
  recipient: { type: String, required: true }, // Receiver (could be another user or room)
  message: { type: String, required: true },   // The message content
  timestamp: { type: Date, default: Date.now } // When the message was sent
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

