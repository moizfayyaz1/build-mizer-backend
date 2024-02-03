import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  projectType: {
    type: String, // "New Construction," "Renovation," etc.
  },
  propertySize: {
    type: Number, // Square footage or area of the property
  },
  materialSelection: {
    type: String, // Details about materials
  },
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
  calculator:[{type:mongoose.Schema.Types.ObjectId,ref:'Calculator',},],
  bricks:[{type:mongoose.Schema.Types.ObjectId,
        ref:'Brick'}],
        cement:[{type:mongoose.Schema.Types.ObjectId,
          ref:'Cement'}],
          crush:[{type:mongoose.Schema.Types.ObjectId,
            ref:'Crush'}],
            sand:[{type:mongoose.Schema.Types.ObjectId,
              ref:'Sand'}],
              steel:[{type:mongoose.Schema.Types.ObjectId,
                ref:'Steel'}],
  constructionPhases: [
    {
      name: String,
      startDate: Date,
      endDate: Date,
    }
  ],
  costEstimates: {
    materialCosts: Number,
    laborCosts: Number,
    miscellaneousCosts: Number,
  },
  projectTimeline: {
    startDate: Date,
    endDate: Date,
  },
 // Names or IDs of contractors
  clientInfo: {
    name: String,
    contact: String,
  },
  projectStatus: {
    type: String, // "Planning," "In Progress," "Completed," etc.
  },
  notes: {
    type: String,
  },
  attachments: [String], // Links or file paths to attached documents
  estimatedValue: Number,
  actualCosts: {
    materialCosts: Number,
    laborCosts: Number,
    miscellaneousCosts: Number,
  },

  projectManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },

  // Progress Tracking Fields
  currentPhase: {
    type: String, // The current construction phase
  },
  spentCost: {
    type: Number, // The amount spent on the project
  },
  remainingCost: {
    type: Number, // The amount remaining from the estimated cost
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
