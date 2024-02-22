import { Router } from 'express';
import { ContactController } from '../controllers/contacts.js'

export const contactsRouter = Router()

contactsRouter.get('/', ContactController.getAll)
contactsRouter.post('/', ContactController.create)

contactsRouter.get('/:id', ContactController.getById)
contactsRouter.delete('/:id', ContactController.delete)
contactsRouter.patch('/:id', ContactController.update)




