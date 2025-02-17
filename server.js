const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

// Load Environment Variables
dotenv.config();

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Socket.io Real-Time Chat
io.on("connection", (socket) => {
  console.log(`⚡ User Connected: ${socket.id}`);

  // Listen for messages
  socket.on("sendMessage", (messageData) => {
    console.log('Message received:', messageData);
    // Broadcast message to all clients in the room
    io.emit("receiveMessage", messageData);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
