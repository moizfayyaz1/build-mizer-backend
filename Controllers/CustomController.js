import CustomMaterial from '../Models/CustomModel.js';

export const createCustom=async(req,res)=>{
    try {
        const { name, quantity, unitCost } = req.body;
    
        // Perform any validation or error handling as needed
    
        const totalCost = quantity * unitCost;
    
        // Create a new custom material document
        const customMaterial = new CustomMaterial({
          name,
          quantity,
          unitCost,
          totalCost,
          project: req.params.projectId, // You may need to adjust this based on your routing
        });
    
        // Save the custom material to the database
        const savedCustomMaterial = await customMaterial.save();
    
        res.status(201).json(savedCustomMaterial);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const getAllCustomMaterials = async (req, res) => {
    try {
      const customMaterials = await CustomMaterial.find({ project: req.params.projectId });
      return res.status(200).json(customMaterials);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const getCustomMaterialById = async (req, res) => {
    try {
      const customMaterial = await CustomMaterial.findById(req.params.id);
      
      if (!customMaterial) {
        return res.status(404).json({ message: 'Custom Material not found' });
      }
      console.log("Hello",customMaterial);
      return res.status(200).json(customMaterial);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const updateCustomMaterial = async (req, res) => {
    try {
      const updatedCustomMaterial = await CustomMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCustomMaterial) {
        return res.status(404).json({ message: 'Custom Material not found' });
      }
      res.status(200).json(updatedCustomMaterial);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export const deleteCustomMaterial = async (req, res) => {
    try {
      const deletedCustomMaterial = await CustomMaterial.findByIdAndRemove(req.params.id);
      if (!deletedCustomMaterial) {
        return res.status(404).json({ message: 'Custom Material not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
