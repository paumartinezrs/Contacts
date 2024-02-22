import express, { json } from 'express'
import { contactsRouter } from './routes/contacts.js'
import { usersRouter } from './routes/users.js'
const app = express()
    
app.use(json())
app.disable('x-powered-by')

app.use('/contacts', contactsRouter)

app.use('/users', usersRouter)


const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto http://localhost:${PORT}`)
})





