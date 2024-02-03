import express from 'express';
import { getAllBricks, createBrick, getBrickById, updateBrick, deleteBrick } from '../../Controllers/Material/BrickController.js';
import { authenticateUserForProjects } from '../../Middlewares/ProjectMiddleware.js';

// Create an instance of the Express router
const router = express.Router();

// Restrict access to authenticated users for project management routes
router.get('/:projectId/', authenticateUserForProjects, getAllBricks);
router.post('/:projectId/', authenticateUserForProjects, createBrick);
router.get('/byId/:id', authenticateUserForProjects, getBrickById);
router.put('/:id', authenticateUserForProjects, updateBrick);
router.delete('/:id', authenticateUserForProjects, deleteBrick);

export default router;
