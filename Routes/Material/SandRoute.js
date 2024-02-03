import express from 'express';
import { getAllSand, createSand, getSandbyId, updateSand, deleteSand } from '../../Controllers/Material/SandController.js';
import { authenticateUserForProjects } from '../../Middlewares/ProjectMiddleware.js';
const router = express.Router();

router.get('/:projectId/', authenticateUserForProjects, getAllSand);
router.post('/:projectId/', authenticateUserForProjects, createSand);
router.get('/byId/:id', authenticateUserForProjects, getSandbyId);
router.put('/:id', authenticateUserForProjects, updateSand);
router.delete('/:id', authenticateUserForProjects, deleteSand);

export default router;