import { Router } from "express";
import { createUser, getUsers } from "../controllers/UserController.js";
import { requireAuth } from "../middlewares/AuthMiddleware.js";
import { requireRole } from "../middlewares/RoleMiddleware.js";

const router = Router()

router.get('/', requireAuth, requireRole('admin'), getUsers)
router.post('/', requireAuth, requireRole('admin'), createUser)

export default router