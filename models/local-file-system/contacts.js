import { readJSON } from '../../utils.js'
import { v4 as uuid } from 'uuid';

const contacts = readJSON('./models/local-file-system/data/contacts.json')

export class ContactModel {
    static async getAll() {
        return contacts
    }

    static async getById ({id}) {
        const contact = contacts.find(c => c.id === id)
        return contact
    }

    static async create ({input}) { //veure que siguin dos contactes existents
        const newContact = {
            id: uuid(),
            ...input
        }
        contacts.push(newContact)
        return newContact
    }

    static async update({id, input}) {
        const index = contacts.findIndex(c => c.id === id)
        if (index === -1) return false

        contacts[index] = {
            ...contacts[index],
            ...input
        }

        return contacts[index]
    }

    static async delete({id}) {
        const index = contacts.findIndex(c => c.id === id)
        if (index === -1) return false
        contacts.splice(index, 1)
        return true        
    }
}

