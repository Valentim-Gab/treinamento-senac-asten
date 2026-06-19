import { Router } from 'express'
import { getUsers, createUser } from '../controllers/UserController.js'
import { requireAuth } from '../middlewares/AuthMiddleware.js'
import { requireRole } from '../middlewares/RoleMiddleware.js'

const router = Router()

router.get('/', requireAuth, getUsers)
router.post('/', requireAuth, requireRole('admin'), createUser)
// router.get('/', requireAuth, requireRole('user'), getUsers);
// router.get('/', requireAuth, requireRole('user', 'admin'), getUsers);

export default router
