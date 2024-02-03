// controllers/calculatorController.js
import Calculator from '../Models/CalculatorModel.js';
import Project from '../Models/ProjectModel.js';
import Brick from '../Models/Materials/Bricks.js';
import Cement from '../Models/Materials/Cement.js';
import Crush from '../Models/Materials/Crush.js';
import Sand from '../Models/Materials/Sand.js';
import Steel from '../Models/Materials/Steel.js';
// Create a new calculator item
export const createCalculatorItem = async (req, res) => {
    try {
      const {
        squareFeet,
      } = req.body;
  
      const project = await Project.findById(req.params.projectId);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const sandRate = 70;  // Set your default values
      const crushRate = 160;  // Set your default values
      const bricksRate = 17;  // Set your default values
      const cementRate = 1300;  // Set your default values
      const steelRate =  258000;

      const persqsandQuantity = (3497 / 2250);
      const persqsteelQuantity= (4/2250);
      const persqcrushQuantity = (1913 / 2250);
      const persqbricksQuantity = (65039 / 2250);
      const persqcementQuantity = (699 / 2250);// Set your default values
  
      const sandCost = Math.floor(sandRate * persqsandQuantity * squareFeet);
      const crushCost = Math.floor(crushRate * persqcrushQuantity * squareFeet);
      const brickCost = Math.floor(bricksRate * persqbricksQuantity * squareFeet);
      const cementCost = Math.floor(cementRate * persqcementQuantity * squareFeet);
      const steelCost= Math.floor(steelRate*persqsteelQuantity*squareFeet);

      const sandQuantity= Math.floor(persqsandQuantity*squareFeet);
      const bricksQuantity=Math.floor(persqbricksQuantity*squareFeet);
      const cementQuantity=Math.floor(persqcementQuantity*squareFeet);
      const crushQuantity=Math.floor(persqcrushQuantity*squareFeet);
      const steelQuantity=(persqsteelQuantity * squareFeet).toFixed(3);

      const totalCost = sandCost + crushCost + brickCost + cementCost + steelCost;
      const brickQuantityDifference=0;
      const sandQuantityDifference=0;
      const crushQuantityDifference=0;
      const cementQuantityDifference=0;
      const steelQuantityDifference=0;

      const brickCostDifference=0;
      const cementCostDifference=0;
      const crushCostDifference=0;
      const sandCostDifference=0;
      const steelCostDifference=0;
      const newItem = new Calculator({
        squareFeet,
        steelRate,  // Set your default values or handle these fields as needed
        steelQuantity,  // Set your default values or handle these fields as needed
        steelCost,
        sandRate,
        sandQuantity,
        crushRate,
        crushQuantity,
        bricksRate,
        bricksQuantity,
        cementRate,
        cementQuantity,
        totalCost,
        brickCost,
        cementCost,
        crushCost,
        sandCost,
        brickCostDifference,
        cementCostDifference,
        steelCostDifference,
        crushCostDifference,
        sandCostDifference,
        brickQuantityDifference,
        sandQuantityDifference,
        crushQuantityDifference,
        cementQuantityDifference,
        steelQuantityDifference,
        project: project._id,
      });
  
      const savedItem = await newItem.save();
  
      project.newItem = project.newItem || [];
      project.newItem.push(savedItem._id);
      await project.save();
  
      res.status(201).json(savedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json(error.message);
    }
  };
  
export const calculateMaterialQuantityDifference = async (req,res) => {
  try {
    // Retrieve the calculator document for the specified project
    const calculator = await Calculator.findOne({ project: req.params.projectId });
    

    // Retrieve the 'received' brick entries for the specified project
    const receivedBricks = await Brick.find({ project: req.params.projectId, status: 'received' });
    const receivedCement= await Cement.find({project:req.params.projectId, status:'received'});
    const receivedSand= await Sand.find({project:req.params.projectId,status:'received'});
    const receivedCrush= await Crush.find({project:req.params.projectId,status:'received'});
    const receivedSteel= await Steel.find({project:req.params.projectId, status:'received'});
    // Calculate the quantity difference for bricks
    const estimatedBricksQuantity = calculator.bricksQuantity || 0;
    const actualBricksQuantity = receivedBricks.reduce((total, brick) => total + brick.quantity, 0);
    const brickQuantityDifference = estimatedBricksQuantity - actualBricksQuantity;

    //Calculate the quantity difference for steel
    const estimatedSteelQuantity=calculator.steelQuantity || 0;
    const actualSteelQuantity= receivedSteel.reduce((total,steel)=> total+ steel.quantity,0);
    const steelQuantityDifference = estimatedSteelQuantity - actualSteelQuantity;

    //Difference for quantity for cement
    const estimatedCementQuantity= calculator.cementQuantity ||0;
    const actualCementQuantity= receivedCement.reduce((total,cement)=>total+cement.quantity,0);
    const cementQuantityDifference=estimatedCementQuantity-actualCementQuantity;

    //Difference for cost for cement



    //Difference for quantity for crush
    const estimatedCrushQuantity=calculator.crushQuantity||0;
    const actualCrushQuantity=receivedCrush.reduce((total,crush)=>total+crush.quantity,0);
    
    const crushQuantityDifference=estimatedCrushQuantity-actualCrushQuantity;
  
    //Difference for cost for crush



    //Difference for quantity for sand
    const estimatedSandQuantity=calculator.sandQuantity||0;
    const actualSandQuantity=receivedSand.reduce((total,sand)=>total+sand.quantity,0);
    const sandQuantityDifference=estimatedSandQuantity-actualSandQuantity;

    //Difference for cost for sand

    const estimatedBricksCost = calculator.brickCost || 0;
    const actualBricksCost = receivedBricks.reduce((total, brick) => total + brick.totalCost, 0);
    const brickCostDifference = estimatedBricksCost - actualBricksCost;

    // Calculate the cost difference for cement
    const estimatedCementCost = calculator.cementCost || 0;
    const actualCementCost = receivedCement.reduce((total, cement) => total + cement.totalCost, 0);
    const cementCostDifference = estimatedCementCost - actualCementCost;

    // Calculate the cost difference for crush
    const estimatedCrushCost = calculator.crushCost || 0;
    const actualCrushCost = receivedCrush.reduce((total, crush) => total + crush.totalCost, 0);
    const crushCostDifference = estimatedCrushCost - actualCrushCost;
    // Calculate the cost difference for steel
    const estimatedSteelCost=calculator.steelCost ||0;
    const actualSteelCost= receivedSteel.reduce((total,steel)=>total+steel.totalCost,0);
    const steelCostDifference=estimatedSteelCost - actualSteelCost;
    // Calculate the cost difference for sand
    const estimatedSandCost = calculator.sandCost || 0;
    const actualSandCost = receivedSand.reduce((total, sand) => total + sand.totalCost, 0);
    const sandCostDifference = estimatedSandCost - actualSandCost;
    
    const actualCost= actualBricksCost+actualCementCost+actualSandCost+actualCrushCost +actualSteelCost;
    // Update the calculator document with the calculated difference
    calculator.brickQuantityDifference = brickQuantityDifference;
    calculator.cementQuantityDifference=cementQuantityDifference;
    calculator.crushQuantityDifference=crushQuantityDifference;
    calculator.sandQuantityDifference=sandQuantityDifference;
    calculator.steelQuantityDifference=steelQuantityDifference;

    calculator.brickCostDifference = isNaN(brickCostDifference) ? 0 : brickCostDifference;
    calculator.cementCostDifference = isNaN(cementCostDifference) ? 0 : cementCostDifference;
    calculator.crushCostDifference = isNaN(crushCostDifference) ? 0 : crushCostDifference;
    calculator.sandCostDifference = isNaN(sandCostDifference) ? 0 : sandCostDifference;
    calculator.steelCostDifference= isNaN(steelCostDifference) ? 0 : steelCostDifference;
    //Update the calculator document with the calculated cost

    calculator.actualBricksQuantity = actualBricksQuantity;
    calculator.actualCementQuantity = actualCementQuantity;
    calculator.actualCrushQuantity = actualCrushQuantity;
    calculator.actualSandQuantity = actualSandQuantity;
    calculator.actualSteelCost = actualSteelCost;
    calculator.actualBricksCost = actualBricksCost;
    calculator.actualCementCost = actualCementCost;
    calculator.actualCrushCost = actualCrushCost;
    calculator.actualSandCost = actualSandCost;
    calculator.actualSteelCost= actualSteelCost;
    calculator.actualCost=actualCost;
    await calculator.save();

    // Repeat the process for other material types (cement, crush, sand) as needed

    console.log('Material quantity differences calculated and updated successfully.');
    return res.status(200).json({ success: true, brickQuantityDifference,sandQuantityDifference,crushQuantityDifference,steelQuantityDifference,cementQuantityDifference,brickCostDifference,sandCostDifference, crushCostDifference,steelCostDifference,cementCostDifference,actualBricksQuantity,
      actualCementQuantity,
      actualCrushQuantity,
      actualSandQuantity,
      actualSteelQuantity,
      actualBricksCost,
      actualCementCost,
      actualCrushCost,
      actualSandCost,
      actualSteelCost,
      brickCost: calculator.brickCost,
      cementCost: calculator.cementCost,
      crushCost: calculator.crushCost,
      sandCost: calculator.sandCost,
      steelCost: calculator.steelCost,
      brickQuantity: calculator.bricksQuantity,
      cementQuantity: calculator.cementQuantity,
      crushQuantity: calculator.crushQuantity,
      sandQuantity: calculator.sandQuantity,
      steelQuantity:calculator.steelQuantity,
      actualCost
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



// Get all calculator items
export const getCalculatorItems = async (req, res) => {
  try {
    const items = await Calculator.find({ project: req.params.projectId });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single calculator item by ID
export const getCalculatorItemById = async (req, res) => {
  try {
    const item = await Calculator.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a calculator item by ID
export const updateCalculatorItem = async (req, res) => {
  try {
    const item = await Calculator.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a calculator item by ID
export const deleteCalculatorItem = async (req, res) => {
  try {
    const item = await Calculator.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
