import { Signup } from "../Controllers/AuthController.js";
import { Router } from "express";

import {Login} from '../Controllers/AuthController.js';
import { Logout } from "../Controllers/AuthController.js";
const router = Router();
router.post("/signup", Signup);
router.post('/login', Login);
router.get('/logout', Logout);






export default router;
