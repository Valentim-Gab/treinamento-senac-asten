import { Router } from 'express'
import * as authController from '../controllers/AuthController.js'
import { requireAuth } from '../middlewares/AuthMiddleware.js'

const router = Router()

router.get('/@me', requireAuth, authController.getMe)
router.post('/login', authController.login)
router.post('/register', authController.register)

export default router
