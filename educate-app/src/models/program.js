import mongoose, { Schema } from "mongoose";

const ProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Check if the model already exists, if not create it
let ProgramModel;
try {
  ProgramModel = mongoose.model("Program");
} catch {
  ProgramModel = mongoose.model("Program", ProgramSchema);
}

export default ProgramModel;
