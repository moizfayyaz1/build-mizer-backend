import express from 'express';
import { getAllSteel, createSteel, getSteelbyId, updateSteel, deleteSteel } from '../../Controllers/Material/SteelController.js';
import { authenticateUserForProjects } from '../../Middlewares/ProjectMiddleware.js';
const router = express.Router();

router.get('/:projectId/', authenticateUserForProjects, getAllSteel);
router.post('/:projectId/', authenticateUserForProjects, createSteel);
router.get('/byId/:id', authenticateUserForProjects, getSteelbyId);
router.put('/:id', authenticateUserForProjects, updateSteel);
router.delete('/:id', authenticateUserForProjects, deleteSteel);

export default router;