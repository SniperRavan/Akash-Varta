import jwt from "jsonwebtoken";

// Function to generate JWT token with 7-day expiration
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "akash-varta-secure-secret-key", {
    expiresIn: "7d",
  });
  return token;
};