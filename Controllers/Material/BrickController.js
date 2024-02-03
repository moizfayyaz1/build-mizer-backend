import Brick from '../../Models/Materials/Bricks.js';

import Project from '../../Models/ProjectModel.js';

export const getAllBricks = async (req, res) => {
    try {
      const bricks = await Brick.find({ project: req.params.projectId });
      const formattedBricks = bricks.map((brick) => ({
        ...brick.toObject(),
        date: brick.date.toLocaleDateString('en-GB'), // Format the date
      }));
      return res.status(200).json(formattedBricks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Create a new brick associated with a specific project
  export const createBrick = async (req, res) => {
    try {
      const {
        date,
        status,
        supplier,
        brand,
        type,
        quantity,
        unit_cost,
        payment,
        payment_type
      } = req.body;
      const project = await Project.findById(req.params.projectId);
      console.log(project);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      const totalCost = quantity * unit_cost;
      const payment_outstanding = totalCost - payment;
  
      const brick = new Brick({
        date,
        status,
        supplier,
        brand,
        type,
        quantity,
        unit_cost,
        totalCost,
        payment,
        payment_type,
        payment_outstanding,
        project: project._id,
      });
  
      const savedBrick = await brick.save();
  
      // Add the brick's ID to the project's bricks array
      
      project.bricks.push(savedBrick._id);
      console.log("hello");
      await project.save();
  
      res.status(200).json(savedBrick);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get details of a specific brick by its ID
  export const getBrickById = async (req, res) => {
    try {
      const brick = await Brick.findById(req.params.id);
      if (!brick) {
        return res.status(404).json({ message: 'Brick not found' });
      }
  
      return res.status(200).json(brick);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Update a brick by its ID
  export const updateBrick = async (req, res) => {
    try {
      const updatedBrick = await Brick.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!updatedBrick) {
        return res.status(404).json({ message: 'Brick not found' });
      }
      
      if (req.body.type && !['awal', 'dom', 'som'].includes(req.body.type)) {
        return res.status(400).json({ message: 'Invalid type value' });
      }
      
      if (updatedBrick.quantity && updatedBrick.unit_cost) {
        updatedBrick.totalCost = updatedBrick.quantity * updatedBrick.unit_cost;
        updatedBrick.payment_outstanding = updatedBrick.totalCost - updatedBrick.payment;
      }
      
      res.status(200).json(updatedBrick);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a brick by its ID
  export const deleteBrick = async (req, res) => {
    try {
      const deletedBrick = await Brick.findByIdAndRemove(req.params.id);
      if (!deletedBrick) {
        return res.status(404).json({ message: 'Brick not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };