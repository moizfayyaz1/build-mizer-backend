// models/calculatorModel.js
import mongoose from 'mongoose';

const calculatorSchema = new mongoose.Schema({
  squareFeet: {
    type: Number,
    required: true,
  },
  steelRate: {
    type: Number,
  },
  steelQuantity: {
    type: Number,
  },
  sandRate: {
    type: Number,
  },
  sandQuantity: {
    type: Number,
  },
  crushRate: {
    type: Number,
  },
  crushQuantity: {
    type: Number,
  },
  bricksRate: {
    type: Number,
  },
  bricksQuantity: {
    type: Number,
  },
  cementRate: {
    type: Number,
  },
  cementQuantity: {
    type: Number,
  },
  sandCost:{
    type:Number,
  },
  brickCost:{
    type:Number,
  },
  crushCost:{
    type:Number,
  },
  cementCost:{
    type:Number,
  },
  steelCost:{
    type:Number,
  },
  totalCost: {
    type: Number,
  },
  brickCostDifference: {
    type: Number, // or any other data type suitable for your application
  },
  cementCostDifference: {
    type: Number,
  },
  crushCostDifference: {
    type: Number,
  },
  sandCostDifference: {
    type: Number,
  },
  steelCostDifference:{
    type: Number,
  },
  brickQuantityDifference: {
    type: Number, // or any other data type suitable for your application
  },
  cementQuantityDifference:{type:Number,},
  crushQuantityDifference:{type:Number,},
  sandQuantityDifference:{type:Number,},
  steelQuantityDifference:{type:Number,},
  actualBricksQuantity: Number,
  actualCementQuantity: Number,
  actualCrushQuantity: Number,
  actualSandQuantity: Number,
  actualSteelQuantity: Number,
  actualBricksCost: Number,
  actualCementCost: Number,
  actualCrushCost: Number,
  actualSandCost: Number,
  actualSteelCost: Number,
  actualCost:Number,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
    required: true,
  },
});

const Calculator = mongoose.model('Calculator', calculatorSchema);

export default Calculator;
