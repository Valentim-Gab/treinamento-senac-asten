import { Router } from 'express'
import { requireAuth } from '../middlewares/AuthMiddleware.js'
import * as todoController from '../controllers/TodoController.js'

const router = Router()

router.use(requireAuth)

router.post('/', todoController.create)
router.get('/', todoController.findAll)
router.get('/:id', todoController.findById)
router.put('/:id', todoController.update)
router.patch('/:id/completed', todoController.updateCompleted)
router.delete('/:id', todoController.remove)

export default router