import mongoose from "mongoose";

const customMaterialSchema= new mongoose.Schema({
    name: {
        type: String,
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
      project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Project', // Reference to the Project model
          required: true,
        },
    });
    const CustomMaterial=mongoose.model('CustomMaterial',customMaterialSchema);
    
export default CustomMaterial;
