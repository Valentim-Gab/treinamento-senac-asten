import { Router } from 'express'
import { requireAuth } from '../middlewares/AuthMiddleware.js'
import * as controller from '../controllers/TodoController.js'

const router = Router()

router.use(requireAuth)

router.post('/', controller.create)
router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)
router.patch('/:id/completed', controller.updateCompleted)

export default router
