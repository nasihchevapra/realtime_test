require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // Allow all origins (adjust in production)
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
require("./config/db");

// Routes
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

// Serve Frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.io Real-time Chat
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("sendMessage", (data) => {
    io.emit("newMessage", data); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Add this at the top with other requires
const Message = require('./models/Message');

// Inside the socket.io connection handler
io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('sendMessage', async (data) => {
    try {
      console.log('Received message:', data);
      
      // 1. Save to MongoDB
      const newMessage = new Message({
        text: data.text,
        user: data.user
      });
      
      const savedMessage = await newMessage.save();
      console.log('Message saved to DB:', savedMessage);
      
      // 2. Broadcast to all clients
      io.emit('newMessage', {
        _id: savedMessage._id,
        text: savedMessage.text,
        user: savedMessage.user,
        createdAt: savedMessage.createdAt
      });
      
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  // ... rest of your code
});