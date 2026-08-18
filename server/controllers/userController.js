import bcrypt from "bcryptjs";
import User from "../lib/models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// Helper to remove sensitive fields
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  return userObj;
};

/* ===========================
   SIGNUP CONTROLLER
=========================== */
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      bio: bio ? bio.trim() : "Hi Everyone, I am Using QuickChat",
    });

    const token = generateToken(newUser._id);
    const safeUser = sanitizeUser(newUser);

    return res.status(201).json({
      success: true,
      user: safeUser,
      userData: safeUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

/* ===========================
   LOGIN CONTROLLER
=========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);
    const safeUser = sanitizeUser(user);

    return res.json({
      success: true,
      user: safeUser,
      userData: safeUser,
      token,
      message: "Account logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

/* ===========================
   CHECK AUTH CONTROLLER
=========================== */
export const checkAuth = (req, res) => {
  try {
    const safeUser = sanitizeUser(req.user);
    return res.json({
      success: true,
      user: safeUser,
      userData: safeUser,
      message: "User is authenticated",
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication check",
    });
  }
};

/* ===========================
   UPDATE PROFILE CONTROLLER
=========================== */
export const updateProfile = async (req, res) => {
  try {
    const { profilePicture, profilePic, fullName, bio } = req.body;
    const imagePayload = profilePicture || profilePic;
    const userId = req.user._id;

    let imageUrl = req.user.profilePicture;

    if (imagePayload && imagePayload.startsWith("data:image")) {
      try {
        const upload = await cloudinary.uploader.upload(imagePayload, {
          folder: "akash-varta/profiles",
          resource_type: "image",
        });
        imageUrl = upload.secure_url;
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, using inline avatar:", cloudErr.message);
        imageUrl = imagePayload;
      }
    } else if (imagePayload) {
      imageUrl = imagePayload;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName ? fullName.trim() : req.user.fullName,
        bio: typeof bio === "string" ? bio.trim() : req.user.bio,
        profilePicture: imageUrl,
      },
      { new: true }
    ).select("-password");

    const safeUser = sanitizeUser(updatedUser);

    return res.json({
      success: true,
      user: safeUser,
      userData: safeUser,
      message: "Profile updated successfully",
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

