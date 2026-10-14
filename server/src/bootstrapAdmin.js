import "dotenv/config";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import mongoose from "mongoose";
import User from "./models/User.js";

const mongoURI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/hotel_management_system";
const email = (
  process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@luxurystay.local"
).trim().toLowerCase();
const name = process.env.BOOTSTRAP_ADMIN_NAME || "LuxuryStay Admin";

try {
  await mongoose.connect(mongoURI);

  if (await User.exists({ role: "admin" })) {
    throw new Error("An admin account already exists. Bootstrap cancelled.");
  }

  if (await User.exists({ email })) {
    throw new Error(`The email ${email} is already in use by another account.`);
  }

  const password = randomBytes(24).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    password: passwordHash,
    role: "admin",
    isActive: true,
  });

  console.log("First admin account created.");
  console.log(`Email: ${email}`);
  console.log(`Temporary password: ${password}`);
  console.log("Save this password now; it will not be shown again.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}