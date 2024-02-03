import Sand from '../../Models/Materials/Sand.js';
import Project from '../../Models/ProjectModel.js';

export const getAllSand=async(req,res)=>{
    try {
        const sand = await Sand.find({ project: req.params.projectId });
        const formattedSand = sand.map((sand) => ({
          ...sand.toObject(),
          date: sand.date.toLocaleDateString('en-GB'), // Format the date
        }));
        return res.status(200).json(formattedSand);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const createSand=async(req,res)=>{
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
    
        const sand = new Sand({
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
    
        const savedSand = await sand.save();
    
        // Add the brick's ID to the project's bricks array
       
        project.sand.push(savedSand._id);
        
        await project.save();
    
        res.status(200).json(savedSand);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getSandbyId=async(req,res)=>{
    try {
        const sand = await Sand.findById(req.params.id);
        if (!sand) {
          return res.status(404).json({ message: 'sand not found' });
        }
    
        return res.status(200).json(sand);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const updateSand=async(req,res)=>{
    try {
        const updatedSand = await Sand.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!updatedSand) {
          return res.status(404).json({ message: 'Sand not found' });
        }
        
        if (req.body.type && !['awal', 'dom', 'som'].includes(req.body.type)) {
          return res.status(400).json({ message: 'Invalid type value' });
        }
        
        if (updatedSand.quantity && updatedSand.unit_cost) {
          updatedSand.totalCost = updatedSand.quantity * updatedSand.unit_cost;
          updatedSand.payment_outstanding = updatedSand.totalCost - updatedSand.payment;
        }

        res.status(200).json(updatedSand);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

export const deleteSand=async(req,res)=>{
    try {
        const deletedSand = await Sand.findByIdAndRemove(req.params.id);
        if (!deletedSand) {
          return res.status(404).json({ message: 'Sand not found' });
        }
        return res.status(204).send();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}