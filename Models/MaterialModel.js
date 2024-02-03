import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    name: {
      type: String,
      enum: ['Bricks','Steel','Crush','Sand','Cement'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
    },
    totalCost:{
        type:Number,
    },
    createdAt: { type: Date, default: Date.now },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model
        required: true,
      },
  });
  


  // Define a virtual field for totalCost
 
  
  const Material = mongoose.model('Material', materialSchema);

 
  export default Material;