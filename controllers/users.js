//import { UserModel } from '../models/local-file-system/users.js'
import { UserModel } from '../models/sqlite/users.js'

import {validateUser, validatePartialUser} from '../schemas/users.js'

export class UserController {
    static async getAll (req, res) {
        const users = await UserModel.getAll()
        res.json(users)
    }

    static async getByNumber (req, res) {
        const {number} = req.params
        try {
            const user = await UserModel.getByNumber({number})
            if (user) {
                res.json(user)
            }
        }
        catch (error) {
            res.status(400).json({message: "400. Bad request. Check user number"})   
        }
    }

    static async create (req, res) {
        const result = validateUser(req.body) //no hauria de crashear si hi ha un camp extra q no volem
        if (!result.success) {
            res.status(400).json({error: JSON.parse(result.error.message)})
        } else {
            try {
                const newUser = await UserModel.create({input: result.data})
                res.status(201).json(newUser)
            } catch (error) {
                res.status(400).json({message: "400. Bad request. Check input data"}) 
            }
        }
    }

    static async update(req, res) {
        const result = validatePartialUser(req.body)
        if (!result.success) return res.status(400).json({error: JSON.parse(result.error.message)})
        
        const {number} = req.params
        
        try {
            const updatedUser = await UserModel.update({number, input: result.data})
            res.status(201).json(updatedUser)
        } catch (error) {
            res.status(400).json({message: "400. Bad request. Check input data"}) 
        }
    }

    static async delete(req, res) {
        const {number} = req.params
        try {
            const result = await UserModel.delete({number})
            console.log("resultado de borrar " + result)
            if (!result) return res.status(400).json({message: 'user ' + number + ' not found'})
            res.json({message: 'user ' + number + ' deleted'})
        } catch (err) {
            res.status(400).json({message: "Unexpected error"})
        }
    }
}