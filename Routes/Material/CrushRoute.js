import express from 'express';
import { getAllCrush, createCrush, getCrushbyId, updateCrush, deleteCrush } from '../../Controllers/Material/CrushController.js';
import { authenticateUserForProjects } from '../../Middlewares/ProjectMiddleware.js';
const router = express.Router();

router.get('/:projectId/', authenticateUserForProjects, getAllCrush);
router.post('/:projectId/', authenticateUserForProjects, createCrush);
router.get('/byId/:id', authenticateUserForProjects, getCrushbyId);
router.put('/:id', authenticateUserForProjects, updateCrush);
router.delete('/:id', authenticateUserForProjects, deleteCrush);

export default router;