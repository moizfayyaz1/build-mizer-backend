import mongoose from "mongoose";

// Define the Brick schema
const brickSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ordered', 'received'],
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  type: {
    type: String,
    enum: ['awal', 'dom','som','other'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit_cost: {
    type: Number,
    required: true
  },
  totalCost:{
    type:Number,
    
  },
  payment: {
    type: Number,
    required: true
  },
  payment_type: {
    type: String,
    enum: ['cash', 'account transfer'],
  },
  payment_outstanding: {
    type: Number
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
    required: true,
  },
});


// Create a Mongoose model for the 'Brick' collection
const Brick = mongoose.model('Brick', brickSchema);

export default Brick;
