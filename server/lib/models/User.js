import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String, required: true, unique: true
  },
  email: {
    type: String, required: true, unique: true
  },
  password: {type: String, required: true, minlength: 6},
  // profilePicture: {type: String, default: ""},
  profilePicture: {type: String, default: ""},
  bio: {type: String, default: ""},
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;