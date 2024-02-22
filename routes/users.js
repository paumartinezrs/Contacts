import { Router } from 'express';
import { UserController } from '../controllers/users.js'

export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)
usersRouter.post('/', UserController.create)

usersRouter.get('/:number', UserController.getByNumber)
usersRouter.delete('/:number', UserController.delete)
usersRouter.patch('/:number', UserController.update)




