import  Material from '../Models/MaterialModel.js';

import Project from '../Models/ProjectModel.js'; // Adjust the path as per your project structure

// Get a list of all materials for a specific project
export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ project: req.params.projectId });
    const formattedMaterials = materials.map((material) => ({
      ...material.toObject(), // Convert Mongoose document to a plain object
      createdAt: material.createdAt.toLocaleDateString('en-GB'), // Format the date
    }));
    return res.status(200).json(formattedMaterials);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Create a new material associated with a specific project
export const createMaterial = async (req, res) => {
  try {
    const { name, quantity, unitCost } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const totalCost = quantity * unitCost;

    const material = new Material({
      name,
      quantity,
      unitCost,
      totalCost,
      project: project._id,
    });

    const savedMaterial = await material.save();

    // Add the material's ID to the project's materials array
    project.materials.push(savedMaterial._id);
    await project.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get details of a specific material by its ID
export const getMaterialById = async (req, res) => {
  console.log("Hello");
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    
    return res.status(200).json(material);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a material by its ID
export const updateMaterial = async (req, res) => {
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (req.body.options && !['Bricks','Steel','Crush','Sand','Cement'].includes(req.body.options)) {
        return res.status(400).json({ message: 'Invalid options value' });
      }
    if (!updatedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    updatedMaterial.totalCost = updatedMaterial.quantity * updatedMaterial.unitCost;
    res.status(200).json(updatedMaterial);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a material by its ID
export const deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await Material.findByIdAndRemove(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: 'Material not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
