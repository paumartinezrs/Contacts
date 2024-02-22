import sqlite3  from 'sqlite3'
const db = new sqlite3.Database('./models/sqlite/db.db', sqlite3.OPEN_READWRITE)

export class UserModel {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users;', (err, rows) => {
                if (err) reject(err.message)
                resolve(rows)
            })
        })   
    }

    static async getByNumber ({number}) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users where number = ? ;', [number], (err, rows) => {
                if (err) reject(err.message)
                if (rows.length == 0) reject('user ' + number + ' does not exist')
                resolve(rows)  
            })
        }) 
    }

    static async create ({input}) { 
        return new Promise((resolve, reject) => {
            const { number, name, surname, email } = input
            db.run('INSERT INTO users VALUES (?, ?, ?, ?) ;', [number, name, surname, email], (err) => {
                if (err) reject(err.message)
                resolve(input)  
            })
        }) 
    }
            
    static async update({number, input}) {
        return new Promise((resolve, reject) => {
            const updateFields = [];
            const updateParams = [];
            if (input.name) {
                updateFields.push("name = ?")
                updateParams.push(input.name)
            }
            if (input.surname) {
                updateFields.push("surname = ?")
                updateParams.push(input.surname)
            }
            if (input.email) {
                updateFields.push("email = ?")
                updateParams.push(input.email)
            }
             
            if (updateParams.length === 0) reject("no hay ningun campo a actualizar")
            
            const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE number = ?;`
            const params = [...updateParams, number]
            
            db.run(updateQuery, params, function (err) {
                if (err) reject(err.message)
                else {
                    if (this.changes === 0) resolve(false) 
                    db.all('SELECT * FROM users where number = ?;', [number], (err, rows) => {
                        if (err) reject(err.message)
                        if (rows.length == 0) reject(false)
                        resolve(rows)  
                    })  
                }
            });
        });   
    }

    static async delete({number}) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM users where number = ?;', [number], function (err) {
                if (err) reject(err.message)
                else {
                    if (this.changes === 0) resolve(false) 
                    resolve(true)  
                }
            });
        }); 
    };
}

 


