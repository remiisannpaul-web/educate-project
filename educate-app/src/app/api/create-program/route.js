import { connectDB } from "@/lib/mongodb";
import Program from "@/models/program";

export async function POST(request) {
  try {
    await connectDB();
    
    // Get the program data from the request body
    const { title, description, price, duration, level, category } = await request.json();
    
    // Validate required fields
    if (!title || !description || !price || !duration || !level || !category) {
      return Response.json({
        message: 'All fields are required: title, description, price, duration, level, and category'
      }, { status: 400 });
    }

    // Validate price is a positive number
    if (isNaN(price) || Number(price) <= 0) {
      return Response.json({
        message: 'Price must be a positive number'
      }, { status: 400 });
    }

    // Check if program with same title already exists
    const existingProgram = await Program.findOne({ title: title });
    if (existingProgram) {
      return Response.json({
        message: 'A program with this title already exists. Please choose a different title.'
      }, { status: 409 });
    }
    
    // Create the new program with the submitted data
    const newProgram = new Program({
      title,
      description,
      price: Number(price),
      duration,
      level,
      category,
      imageUrl: "", // Default empty image URL
    });
    
    const savedProgram = await newProgram.save();
    
    return Response.json({
      message: "Program created successfully",
      program: {
        id: savedProgram._id,
        title: savedProgram.title,
        description: savedProgram.description,
        price: savedProgram.price,
        duration: savedProgram.duration,
        level: savedProgram.level,
        category: savedProgram.category,
        imageUrl: savedProgram.imageUrl,
        createdAt: savedProgram.createdAt,
        updatedAt: savedProgram.updatedAt
      }
    });
  } catch (error) {
    console.error("Error creating program:", error);
    
    // Handle specific database errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return Response.json({
        message: `Validation error: ${validationErrors.join(', ')}`
      }, { status: 400 });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      return Response.json({
        message: 'A program with this title already exists. Please choose a different title.'
      }, { status: 409 });
    } else {
      return Response.json({
        message: "Failed to create program",
        details: error.message
      }, { status: 500 });
    }
  }
}
