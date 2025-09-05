import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: "admin@example.com" });
    if (existingUser) {
      return Response.json({
        message: "Test user already exists",
        email: "admin@example.com",
        password: "password"
      });
    }
    
    // Create test user
    const hashedPassword = await bcrypt.hash("password", 12);
    const testUser = new User({
      email: "admin@example.com",
      password: hashedPassword,
      name: "Admin User"
    });
    
    await testUser.save();
    
    return Response.json({
      message: "Test user created successfully",
      email: "admin@example.com",
      password: "password"
    });
  } catch (error) {
    console.error("Error creating test user:", error);
    return Response.json({
      error: "Failed to create test user",
      details: error.message
    }, { status: 500 });
  }
}
