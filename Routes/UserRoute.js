import { userResponse} from "../Middlewares/UserMiddleware.js";
import { Router } from "express";
const router = Router();
router.post('/',userResponse);
export default router;