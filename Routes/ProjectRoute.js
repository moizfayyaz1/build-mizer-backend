import express from 'express';
import { getAllProjects, createProject, updateProject,getProjectById, deleteProject } from '../Controllers/ProjectController.js';
import { authenticateUserForProjects } from '../Middlewares/ProjectMiddleware.js';
import { userResponse } from '../Middlewares/UserMiddleware.js';
// Create an instance of the Express router
const router = express.Router();

// Restrict access to authenticated users for project management routes
router.get('/', authenticateUserForProjects, getAllProjects); 
router.post('/create', authenticateUserForProjects, createProject);
router.get('/:id', authenticateUserForProjects, getProjectById); // Add this route
router.put('/:id', authenticateUserForProjects, updateProject);
router.delete('/:id', authenticateUserForProjects, deleteProject);

export default router;
