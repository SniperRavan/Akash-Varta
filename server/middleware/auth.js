// import User from "../lib/models/User";
// import jwt from "jsonwebtoken";

// //Middleware to authenticate user requests to protect routes
// export const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.headers.token;
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.userId) .select ("-password");

//         if (!user) {
//             return res.status(401).json({success: false, message: "Unauthorized"});
//         req.user = user;
//         next();
//         } 
//         } catch(error) {
//             console.error("Auth middleware error:",error);
//             return res.status(500).json({success: false, message: "Server error"});
//         }
    
// }



import User from "../lib/models/User.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate user requests to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
