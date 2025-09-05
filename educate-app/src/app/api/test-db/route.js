import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Testing database connection...");
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
    
    await connectDB();
    console.log("Database connected successfully!");
    
    return Response.json({
      success: true,
      message: "Database connection successful",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return Response.json({
      success: false,
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}
