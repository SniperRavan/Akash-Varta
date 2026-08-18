import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Message from "./models/Message.js";

// Helper to seed initial accounts if DB is empty
export const seedDemoData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("Seeding demo accounts...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("password123", salt);

      const [alex, caroline, martin, enrique, marco, richard] = await User.create([
        {
          fullName: "Alex Mercer",
          email: "alex@example.com",
          password: hashedPassword,
          bio: "Full-Stack Engineer building real-time collaboration tools.",
        },
        {
          fullName: "Caroline Gray",
          email: "caroline@example.com",
          password: hashedPassword,
          bio: "Senior Product Designer & UI Enthusiast. Living in San Francisco.",
        },
        {
          fullName: "Presley Martin",
          email: "martin@example.com",
          password: hashedPassword,
          bio: "Frontend Architect & Open Source Contributor.",
        },
        {
          fullName: "Enrique Martinez",
          email: "enrique@example.com",
          password: hashedPassword,
          bio: "Mobile Developer & System Engineer.",
        },
        {
          fullName: "Marco Jones",
          email: "marco@example.com",
          password: hashedPassword,
          bio: "Cloud & Security Specialist.",
        },
        {
          fullName: "Richard Smith",
          email: "richard@example.com",
          password: hashedPassword,
          bio: "Hi Everyone, I am Using QuickChat",
        },
      ]);

      await Message.create([
        {
          senderId: caroline._id,
          receiverId: alex._id,
          text: "Hey Alex! Welcome to Akash-Varta.",
          seen: true,
        },
        {
          senderId: caroline._id,
          receiverId: alex._id,
          text: "Feel free to test sending images, switching themes, or updating your profile.",
          seen: true,
        },
        {
          senderId: alex._id,
          receiverId: caroline._id,
          text: "Thanks Caroline! Everything is working smoothly.",
          seen: true,
        },
      ]);

      console.log("Demo accounts seeded successfully.");
    }
  } catch (err) {
    console.error("Demo seeding error:", err);
  }
};


// Function to connect to MongoDB Database with resilient fallback
export const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      if (!mongoUri.includes("/chat-app") && !mongoUri.includes("?")) {
        mongoUri = `${mongoUri.replace(/\/+$/, "")}/chat-app`;
      }
      try {
        await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 4000,
        });
        console.log("Connected to MongoDB:", mongoUri.split("@").pop());
        await seedDemoData();
        return;
      } catch (atlasErr) {
        console.warn("MongoDB Atlas connection failed. Falling back to in-memory database...", atlasErr.message);
      }
    }

    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log("Connected to in-memory MongoDB:", uri);
    await seedDemoData();
  } catch (error) {
    console.error("Database connection failure:", error);
  }
};