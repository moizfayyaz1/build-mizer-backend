import express from 'express';
import { getAllCement, createCement, getCementbyId, updateCement, deleteCement } from '../../Controllers/Material/CementController.js';
import { authenticateUserForProjects } from '../../Middlewares/ProjectMiddleware.js';
const router = express.Router();

router.get('/:projectId/', authenticateUserForProjects, getAllCement);
router.post('/:projectId/', authenticateUserForProjects, createCement);
router.get('/byId/:id', authenticateUserForProjects, getCementbyId);
router.put('/:id', authenticateUserForProjects, updateCement);
router.delete('/:id', authenticateUserForProjects, deleteCement);

export default router;