import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/hotel_management_system";

    await mongoose.connect(mongoURI);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📦 Database : ${mongoose.connection.name}`);
    console.log(`🌐 Host     : ${mongoose.connection.host}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(1);
  }
}