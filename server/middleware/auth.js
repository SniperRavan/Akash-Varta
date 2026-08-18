import User from "../lib/models/User.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate user requests to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "akash-varta-secure-secret-key");
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default protectRoute;