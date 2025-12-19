// import bcrypt from 'bcryptjs';
// import User from '../lib/models/User.js';
// import { generateToken } from '../lib/utils.js';
// import cloudinary from '../lib/cloudinary.js';

// // Signup a new user
// export const signup = async () => {
//     const {fullName, email, password, bio} = req.body;

//     try {
//         // Check if user already exists
//         if (!fullName || !email || !password || !bio) {
//             return res.status(400).json({message: "All fields are required"});
//         }
//         const user = await User.findOne({email});
//         if (user) {
//             return res.status(400).json({message: "User already exists"});
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = await User.create({
//             fullName,
//             email,
//             password: hashedPassword,
//             bio
//         });
//        const token = generateToken(newUser._id);
//         return res.json({success: true, userData: newUser, token, message: "User registered successfully"});
//     } catch (error) {
//         console.error("Error during signup:", error);
//         return res.json({success: false, message: "Server error"});
//     }
// }

// // Contoller to login user
// export const login = async (req, res) => {
//     try {
//         {const {email, password} = req.body;
//         const userData = await User.findOne({email});

//         const isPasswordValid = await bcrypt.compare(password, userData.password);

//         if (isPasswordValid) {
//             return res.json({success: false,message: "Invalid credentials"});
//         }
//         const token = generateToken(userData._id);
//         return res.json({success: true, userData, token, message: "Account logged in successfully"});
//         }
//     } catch (error) {
//         console.log("Error during login:", error); //console.log(error.message); which one to use?
//         return res.json({success: false, message: "Server error"});
//     }

// }

// //Controller to check if user is authenticated
// export const checkAuth = (req, res) => {
//     console.log("Authenticated user:", req.user);
//     res.json({success: true, user: req.user, message: "User is authenticated"});
// }


// // Controller to update user profile
// export const updateProfile = async (req, res) => {
//     try{
//         const { profilePic, fullName, bio } = req.body;
        
//         const userId = req.user._id;
//         let updateUser;

//         if(!profilePic){
//            updateUser = await User.findByIdAndUpdate(userId, {bio, fullName, profilePic }, {new: true});
//         } else {
//             const upload = await cloudinary.uploader.upload(profilePic);

//             updateUser = await User.findByIdAndUpdate(userId, {bio, fullName, profilePic: upload.secure_url }, {new: true});
//         }
//         res.json({success: true, user: updateUser});
//     } catch(error){
//         console.error("Error updating profile:", error);
//         return res.json({success: false, message: "Server error"});
//     }
// }


import bcrypt from "bcryptjs";
import User from "../lib/models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

/* ===========================
   SIGNUP CONTROLLER
=========================== */
export const signup = async (req, res) => {
    try {
        const { fullName, email, password, bio } = req.body;

        // Validate input
        if (!fullName || !email || !password || !bio) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        // Generate token
        const token = generateToken(newUser._id);

        return res.status(201).json({
            success: true,
            userData: newUser,
            token,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


/* ===========================
   LOGIN CONTROLLER
=========================== */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(userData._id);

        return res.json({
            success: true,
            userData,
            token,
            message: "Account logged in successfully"
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


/* ===========================
   CHECK AUTH CONTROLLER
=========================== */
export const checkAuth = (req, res) => {
    try {
        return res.json({
            success: true,
            user: req.user,
            message: "User is authenticated"
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


/* ===========================
   UPDATE PROFILE CONTROLLER
=========================== */
// export const updateProfile = async (req, res) => {
//     try {
//         const { profilePic, fullName, bio } = req.body;
//         const userId = req.user._id;

//         let updatedUser;

//         // If no new image
//         if (!profilePic) {
//             updatedUser = await User.findByIdAndUpdate(
//                 userId,
//                 { fullName, bio },
//                 { new: true }
//             );
//         } else {
//             // Upload image to Cloudinary
//             const uploadResult = await cloudinary.uploader.upload(profilePic);

//             updatedUser = await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     fullName,
//                     bio,
//                     profilePic: uploadResult.secure_url
//                 },
//                 { new: true }
//             );
//         }

//         return res.json({
//             success: true,
//             user: updatedUser
//         });

//     } catch (error) {
//         console.error("Update profile error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };



export const updateProfile = async (req, res) => {
  console.log("UPDATE PROFILE HIT");
  console.log("BODY SIZE:", JSON.stringify(req.body).length);
  console.log("USER:", req.user);
  console.log("CLOUDINARY NAME:", process.env.CLOUDINARY_CLOUD_NAME);


  try {
    const { profilePic, fullName, bio } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found in request"
      });
    }

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { fullName, bio },
        { new: true }
      );
    } else {
      console.log("Uploading to cloudinary...");
      const upload = await cloudinary.uploader.upload(profilePic);
      console.log("Cloudinary OK");

      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          fullName,
          bio,
          profilePic: upload.secure_url
        },
        { new: true }
      );
    }

    return res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("🔥 UPDATE PROFILE ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
