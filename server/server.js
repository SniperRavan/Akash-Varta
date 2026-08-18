import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store Online Users: { userId: socketId }
export const userSocketMap = {};

// Socket.io connection handling
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit updated online users list to all clients
  io.emit("online-users", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }
    io.emit("online-users", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Routes setup
app.use("/api/status", (req, res) => res.json({ status: "running", time: new Date() }));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on port: " + PORT));

