import express from 'express';
import { getAllMaterials,createMaterial,getMaterialById,updateMaterial,deleteMaterial } from '../Controllers/MaterialController.js';

import { authenticateUserForProjects } from '../Middlewares/ProjectMiddleware.js';

// Create an instance of the Express router
const router = express.Router();

// Restrict access to authenticated users for project management routes
router.get('/:projectId/', authenticateUserForProjects, getAllMaterials); 
router.post('/:projectId/', authenticateUserForProjects, createMaterial);
//added /read/ to avoid conflict
router.get('/byId/:id', authenticateUserForProjects, getMaterialById); // Add this route
router.put('/:id', authenticateUserForProjects, updateMaterial);
router.delete('/:id', authenticateUserForProjects, deleteMaterial);

export default router;
