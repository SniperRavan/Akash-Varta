// import express from 'express';
// import "dotenv/config";
// import cors from 'cors';
// import http from 'http';
// import { connectDB } from './lib/db.js';
// import userRouter from './routes/userRoutes.js';
// import messageRouter from './routes/messageRoutes.js';
// import { Server } from 'socket.io';

// // Create Express app and HTTP server
// const app = express();
// const server = http.createServer(app);

// // Initialize Socket.io
// export const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });

// // Store Online Users
// export const userSocketMap = {}; // {userId: socketId}

// // Socket.io connection handling
// io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     console.log("New client connected: " , userId);
//     if (userId) userSocketMap[userId] = socket.id;

//     // Emit OnlineUsers to all connected clients
//     io.emit("OnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("Client disconnected: ", userId);
//         delete userSocketMap[userId];
//         // Emit OnlineUsers to all connected clients
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     })
// })
// // Middleware setup
// app.use(cors());
// app.use(express.json({limit: '5mb'}));

// // Routes setup
// app.use("/api/status", (req, res) => res.send("Server is running"));
// app.use("/api/auth", userRouter);
// app.use("/api/messages", messageRouter);
// // Connect to MongoDB
// await connectDB();

// // Start the server

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log("Server is running on port: " + PORT));



import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Store Online Users
export const userSocketMap = {}; // {userId: socketId}

// Socket.io connection handling
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("New client connected: ", userId);
    
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users to all connected clients
    io.emit("online-users", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("Client disconnected: ", userId);
        delete userSocketMap[userId];
        // Emit updated online users to all connected clients
        io.emit("online-users", Object.keys(userSocketMap));
    });
});

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));


// Routes setup
app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on port: " + PORT));
