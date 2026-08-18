import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Message from "../lib/models/Message.js";
import User from "../lib/models/User.js";
import { io, userSocketMap } from "../server.js";

// Get all users except the logged-in user with unread counts aggregated
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all other users
    const filteredUsers = await User.find({ _id: { $ne: userId } })
      .select("-password")
      .sort({ updatedAt: -1 });

    // Aggregate unread message counts in a single query
    const unreadAgg = await Message.aggregate([
      {
        $match: {
          receiverId: new mongoose.Types.ObjectId(userId),
          seen: false,
        },
      },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 },
        },
      },
    ]);

    const unseenMessages = {};
    unreadAgg.forEach((item) => {
      unseenMessages[item._id.toString()] = item.count;
    });

    return res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get messages between logged-in user and selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    // Mark incoming unread messages as seen
    const updateResult = await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId, seen: false },
      { $set: { seen: true } }
    );

    // Notify sender in real-time if their messages were seen
    if (updateResult.modifiedCount > 0) {
      const senderSocketId = userSocketMap[selectedUserId];
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", {
          readerId: myId.toString(),
        });
      }
    }

    return res.json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Mark individual message as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Message.findByIdAndUpdate(id, { seen: true }, { new: true });

    if (updated) {
      const senderSocketId = userSocketMap[updated.senderId.toString()];
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", {
          messageId: id,
          readerId: req.user._id.toString(),
        });
      }
    }

    return res.json({ success: true, message: "Message marked as seen" });
  } catch (error) {
    console.error("Error marking messages as seen:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Send message to selected user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    if (!text?.trim() && !image) {
      return res.status(400).json({
        success: false,
        message: "Message must contain text or an image",
      });
    }

    let imageUrl = "";
    if (image && image.startsWith("data:image")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "akash-varta/chat-images",
          resource_type: "image",
        });
        imageUrl = uploadResponse.secure_url;
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to payload URI:", cloudErr.message);
        imageUrl = image;
      }
    } else if (image) {
      imageUrl = image;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text ? text.trim() : "",
      image: imageUrl,
      seen: false,
    });

    // Emit live message to recipient
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};