import { readJSON } from '../../utils.js'
import { v4 as uuid } from 'uuid';

export class ContactModel {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM contacts;', (err, rows) => {
                if (err) reject(err.message)
                resolve(rows)
            })
        })  
    }

    static async getById ({id}) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM contacts where id = ? ;', [id], (err, rows) => {
                if (err) reject(err.message)
                if (rows.length == 0) reject('user ' + number + ' does not exist')
                resolve(rows)  
            })
        }) 
    }

    static async create ({input}) { 
        return new Promise((resolve, reject) => {
            const newContact = {
                id: uuid(),
                ...input
            }
            db.run('INSERT INTO contacts VALUES (?, ?, ?, ?) ;', 
                    [newContact.id, newContact.owner, newContact.contact, newContact.relation], (err) => {
                        if (err) reject(err.message)
                        resolve(input)  
                    })
        }) 
    }

    static async update({id, input}) {
        return new Promise((resolve, reject) => {
            //que pasa si no llega ninguno de los tres campos?
            const updateFields = [];
            const updateParams = [];
            if (input.name) {
                updateFields.push("owner = ?")
                updateParams.push(input.owner)
            }
            if (input.surname) {
                updateFields.push("contact = ?")
                updateParams.push(input.contact)
            }
            if (input.email) {
                updateFields.push("relation = ?")
                updateParams.push(input.relation)
            }
            
            if (updateParams.length === 0) reject("no hay ningun campo a actualizar")

            const updateQuery = `UPDATE contacts SET ${updateFields.join(', ')} WHERE id = ?;`
            const params = [...updateParams, id]

            db.run(updateQuery, params, function (err) {
                if (err) reject(err.message)
                else {
                    if (this.changes === 0) resolve(false) 
                    db.all('SELECT * FROM contacts where id = ?;', [id], (err, rows) => {
                        if (err) reject(err.message)
                        if (rows.length == 0) reject("error al recuperar el contacto actualizado")
                        resolve(rows)  
                    })  
                }
            });

        });   
    }

    static async delete({id}) {       
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM contacts where id = ?;', [id], function (err) {
                if (err) reject(err.message)
                else {
                    if (this.changes === 0) resolve(false) 
                    resolve(true)  
                }
            });
        }); 
    }
}

