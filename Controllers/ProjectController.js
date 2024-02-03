import Project from '../Models/ProjectModel.js'; // Adjust the path as per your project structure
import User from '../Models/UserModel.js';
import { config } from 'dotenv';
const TOKEN_KEY = config.TOKEN_KEY;
import jwt from 'jsonwebtoken';


// Get a list of all projects
export const getAllProjects = async (req, res) => {
  const token = req.cookies.token; // Adjust this based on your token storage method
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // Get the user's ID from the URL parameters
    
  try {
    // Retrieve only the projects where projectManager matches the userid
    const projects = await Project.find({ projectManager: decodedToken.id });
    
    return res.status(200).json(projects);
    
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, location, /* other project properties */ } = req.body;

    // Extract the user ID from the JWT token
    const token = req.headers.authorization; // Assuming the token is in the "Authorization" header

    if (!token) {
      return res.status(401).json({ error: 'JWT token is missing' });
    }

    // Extract the token value (the "Bearer" prefix is commonly used)
    const tokenValue = token.replace('Bearer ', '');

    // Verify and decode the token
    const decodedToken = jwt.verify(tokenValue, process.env.TOKEN_KEY);
// Verify and decode the token

    // Create a new project with the extracted user ID as the project manager
    const newProject = new Project({
      name,
      description,
      location,
      projectManager: decodedToken.id, // Set the projectManager field to the user's ID
      // Set other project properties
    });

    const savedProject = await newProject.save();

    // Now, the project is associated with the logged-in user.

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// Get details of a specific project by its ID
export const getProjectById = async (req, res) => {
  console.log("done");
  try {
    const project = await Project.findById(req.params.id).populate('projectManager'); // Assuming the project ID is in the URL params
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json(project);
   
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};

// Update a project by its ID
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a project by its ID
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
