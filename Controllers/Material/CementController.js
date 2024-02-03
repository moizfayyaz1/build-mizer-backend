import Cement from '../../Models/Materials/Cement.js';
import Project from '../../Models/ProjectModel.js';

export const getAllCement=async(req,res)=>{
    try {
        const cement = await Cement.find({ project: req.params.projectId });
        const formattedCement = cement.map((cement) => ({
          ...cement.toObject(),
          date: cement.date.toLocaleDateString('en-GB'), // Format the date
        }));
        return res.status(200).json(formattedCement);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const createCement=async(req,res)=>{
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
        
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
    
        const totalCost = quantity * unit_cost;
        const payment_outstanding = totalCost - payment;
    
        const cement = new Cement({
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
    
        const savedCement = await cement.save();
    
        // Add the brick's ID to the project's bricks array
       
        project.cement.push(savedCement._id);
        
        await project.save();
    
        res.status(200).json(savedCement);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getCementbyId=async(req,res)=>{
    try {
        const cement = await Cement.findById(req.params.id);
        if (!cement) {
          return res.status(404).json({ message: 'Cement not found' });
        }
    
        return res.status(200).json(cement);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const deleteCement=async(req,res)=>{
    try {
        const deletedCement = await Cement.findByIdAndRemove(req.params.id);
        if (!deletedCement) {
          return res.status(404).json({ message: 'Cement not found' });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const updateCement=async(req,res)=>{
    try {
        const updatedCement = await Cement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedCement) {
          return res.status(404).json({ message: 'Cement not found' });
        }
        
        if (req.body.type && !['awal', 'dom', 'som'].includes(req.body.type)) {
          return res.status(400).json({ message: 'Invalid type value' });
        }
        
        if (updatedCement.quantity && updatedCement.unit_cost) {
          updatedCement.totalCost = updatedCement.quantity * updatedCement.unit_cost;
          updatedCement.payment_outstanding = updatedCement.totalCost - updatedCement.payment;
        }

        res.status(200).json(updatedCement);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}