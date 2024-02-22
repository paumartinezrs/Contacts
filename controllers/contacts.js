import {ContactModel} from '../models/local-file-system/contacts.js'

import {validateContact, validatePartialContact} from '../schemas/contacts.js'

export class ContactController {
    static async getAll (req, res) {
        const contacts = await ContactModel.getAll()
        res.json(contacts)
    }

    static async getById (req, res) {
        const {id} = req.params
        const contact = await ContactModel.getById({id})
        if (contact) res.json(contact)
        else res.status(404).json({message: 'contact not found'})
    }

    static async create (req, res) {
        const result = validateContact(req.body)
        if (!result.success) {
            res.status(400).json({error: JSON.parse(result.error.message)})
        } else {
            const newContact = await ContactModel.create({input: result.data})
            res.status(201).json(newContact)
        }
    }

    static async update(req, res) {
        const result = validatePartialContact(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        
        const {id} = req.params
        const updatedContact = await ContactModel.update({id, input: result.data})
        
        if (!updatedContact) return res.status(404).json({message: 'contact ' + id + ' not found'})
        res.json(updatedContact)
    }

    static async delete(req, res) {
        const {id} = req.params
        const result = await ContactModel.delete({id})
        if (!result) {
            res.status(404).json({message: 'contact ' + id + ' not found'})
        } else {
            res.json({message: 'contact deleted'})
        }
    }
}