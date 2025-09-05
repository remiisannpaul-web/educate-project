import { connectDB } from "@/lib/mongodb";
import Program from "@/models/program";

export async function GET() {
  try {
    await connectDB();
    console.log("Testing Program model...");
    
    // Try to create a simple program
    const testProgram = new Program({
      title: "Test Program",
      description: "This is a test program",
      price: 99,
      duration: "1 week",
      level: "Beginner",
      category: "Test",
      imageUrl: "/test.jpg"
    });
    
    const savedProgram = await testProgram.save();
    console.log("Program saved:", savedProgram._id);
    
    // Try to find it
    const foundProgram = await Program.findById(savedProgram._id);
    console.log("Program found:", foundProgram ? "Yes" : "No");
    
    // Clean up
    await Program.findByIdAndDelete(savedProgram._id);
    console.log("Test program cleaned up");
    
    return Response.json({
      success: true,
      message: "Program model test successful",
      programId: savedProgram._id.toString()
    });
  } catch (error) {
    console.error("Program model test failed:", error);
    return Response.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
