import ProgramModel from "@/models/program";
import { NextResponse } from "next/server";
import { connectDB } from "../mongodb";

export default async function createProgram(request) {
  try {
    await connectDB();
    
    const {title, description, price, duration, level, category} = await request.json();

    // Validate required fields
    if (!title || !description || !price || !duration || !level || !category) {
      return NextResponse.json({
        message: 'All fields are required: title, description, price, duration, level, and category'
      }, { status: 400 });
    }

    // Validate price is a positive number
    if (isNaN(price) || Number(price) <= 0) {
      return NextResponse.json({
        message: 'Price must be a positive number'
      }, { status: 400 });
    }

    const alreadyExistingProgram = await ProgramModel.findOne({title: title});

    if (alreadyExistingProgram) {
      return NextResponse.json({
        message: 'A program with this title already exists. Please choose a different title.'
      }, { status: 409 });
    }

    const newProgram = await ProgramModel.create({
      title: title, 
      description: description, 
      price: Number(price), 
      duration: duration, 
      level: level, 
      category: category
    });
    
    await newProgram.save();

    return NextResponse.json({
      message: 'Program created successfully!',
      programId: newProgram._id
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating program:", error);
    
    // Handle specific database errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        message: `Validation error: ${validationErrors.join(', ')}`
      }, { status: 400 });
    } else if (error.name === 'MongoError' && error.code === 11000) {
      return NextResponse.json({
        message: 'A program with this title already exists. Please choose a different title.'
      }, { status: 409 });
    } else if (error.message && error.message.includes('MONGODB_URI')) {
      return NextResponse.json({
        message: 'Database connection error. Please try again later.'
      }, { status: 500 });
    } else {
      return NextResponse.json({
        message: 'Failed to create program. Please try again later.'
      }, { status: 500 });
    }
  }
}