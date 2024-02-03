import { createCustom, getAllCustomMaterials,getCustomMaterialById,updateCustomMaterial,deleteCustomMaterial } from '../Controllers/CustomController.js';
import { authenticateUserForProjects } from '../Middlewares/ProjectMiddleware.js';
import  express  from 'express';
const router = express.Router();

router.post('/:projectId/', authenticateUserForProjects, createCustom);
router.get('/:projectId/',authenticateUserForProjects,getAllCustomMaterials);
// below works because there is no conflict in routes
router.get('/custom/:id',authenticateUserForProjects,getCustomMaterialById);
router.put('/:id',authenticateUserForProjects,updateCustomMaterial);
router.delete('/:id',authenticateUserForProjects,deleteCustomMaterial);
export default router;