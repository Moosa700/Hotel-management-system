import jwt from "jsonwebtoken";

export function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the .env file.");
  }

  return jwt.sign(
    {
      id: user._id?.toString() || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      issuer: "HotelManagementSystem",
      audience: "HotelManagementClient",
    }
  );
}