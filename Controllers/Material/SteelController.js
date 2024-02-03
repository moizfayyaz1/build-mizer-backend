import Steel from '../../Models/Materials/Steel.js';
import Project from '../../Models/ProjectModel.js';

export const getAllSteel=async(req,res)=>{
    try {
        const steel = await Steel.find({ project: req.params.projectId });
        const formattedSteel = steel.map((steel) => ({
          ...steel.toObject(),
          date: steel.date.toLocaleDateString('en-GB'), // Format the date
        }));
        return res.status(200).json(formattedSteel);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const createSteel=async(req,res)=>{
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
    
        const steel = new Steel({
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
    
        const savedSteel = await steel.save();
    
        // Add the brick's ID to the project's bricks array
       
        project.steel.push(savedSteel._id);
        
        await project.save();
    
        res.status(200).json(savedSteel);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getSteelbyId=async(req,res)=>{
    try {
        const steel = await Steel.findById(req.params.id);
        if (!steel) {
          return res.status(404).json({ message: 'steel not found' });
        }
    
        return res.status(200).json(steel);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const updateSteel=async(req,res)=>{
    try {
        const updatedSteel = await Steel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedSteel) {
          return res.status(404).json({ message: 'Steel not found' });
        }
        
        if (req.body.type && !['awal', 'dom', 'som'].includes(req.body.type)) {
          return res.status(400).json({ message: 'Invalid type value' });
        }
        
        if (updatedSteel.quantity && updatedSteel.unit_cost) {
          updatedSteel.totalCost = updatedSteel.quantity * updatedSteel.unit_cost;
          updatedSteel.payment_outstanding = updatedSteel.totalCost - updatedSteel.payment;
        }

        res.status(200).json(updatedSteel);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const deleteSteel=async(req,res)=>{
    try {
        const deletedSteel = await Steel.findByIdAndRemove(req.params.id);
        if (!deletedSteel) {
          return res.status(404).json({ message: 'Steel not found' });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}