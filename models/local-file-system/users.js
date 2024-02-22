import { readJSON } from '../../utils.js'

const users = readJSON('./models/local-file-system/data/users.json')

export class UserModel {
    static async getAll() {
        return users
    }

    static async getByNumber ({number}) {
        number = parseInt(number);
        const user = users.find(u => u.number === number)
        console.log(user)
        return user
    }

    static async create ({input}) { //que no exista uno con el mismo numero
        const newUser = {
            ...input
        }
        users.push(newUser)
        return newUser
    }

    static async update({number, input}) {
        number = parseInt(number);
        const index = users.findIndex(u => u.number === number)
        if (index === -1) return false

        users[index] = {
            ...users[index],
            ...input
        }

        return users[index]
    }

    static async delete({number}) {
        number = parseInt(number);
        const index = users.findIndex(u => u.number === number)
        if (index === -1) return false
        users.splice(index, 1)
        return true        
    }
}