import { connectDB } from "@/lib/mongodb";
import Program from "@/models/program";

export async function GET() {
  try {
    await connectDB();
    console.log("Database connected successfully");
    
    const programs = await Program.find({}).sort({ createdAt: -1 });
    console.log("Found programs:", programs.length);
    
    return Response.json(programs);
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      { error: "Failed to fetch programs", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const program = new Program({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const result = await program.save();
    
    return Response.json(
      { message: "Program created successfully", id: result._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return Response.json(
      { error: "Failed to create program", details: error.message },
      { status: 500 }
    );
  }
}
