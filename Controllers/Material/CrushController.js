import Crush from '../../Models/Materials/Crush.js';
import Project from '../../Models/ProjectModel.js';

export const getAllCrush=async(req,res)=>{
    try {
        const crush = await Crush.find({ project: req.params.projectId });
        const formattedCrush = crush.map((crush) => ({
          ...crush.toObject(),
          date: crush.date.toLocaleDateString('en-GB'), // Format the date
        }));
        return res.status(200).json(formattedCrush);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const createCrush=async(req,res)=>{
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
    
        const crush = new Crush({
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
    
        const savedCrush = await crush.save();
    
        // Add the brick's ID to the project's bricks array
       
        project.crush.push(savedCrush._id);
        
        await project.save();
    
        res.status(200).json(savedCrush);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getCrushbyId=async(req,res)=>{
    try {
        const crush = await Crush.findById(req.params.id);
        if (!crush) {
          return res.status(404).json({ message: 'crush not found' });
        }
    
        return res.status(200).json(crush);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const updateCrush=async(req,res)=>{
    try {
        const updatedCrush = await Crush.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedCrush) {
          return res.status(404).json({ message: 'Crush not found' });
        }
        
        if (req.body.type && !['awal', 'dom', 'som'].includes(req.body.type)) {
          return res.status(400).json({ message: 'Invalid type value' });
        }
        
        if (updatedCrush.quantity && updatedCrush.unit_cost) {
          updatedCrush.totalCost = updatedCrush.quantity * updatedCrush.unit_cost;
          updatedCrush.payment_outstanding = updatedCrush.totalCost - updatedCrush.payment;
        }

        res.status(200).json(updatedCrush);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const deleteCrush=async(req,res)=>{
    try {
        const deletedCrush = await Crush.findByIdAndRemove(req.params.id);
        if (!deletedCrush) {
          return res.status(404).json({ message: 'Crush not found' });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}