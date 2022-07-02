import express from 'express'
import UserController from './controllers/UserController'
const app = express()

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/users', UserController.find)

app.listen(3000, ()=>console.log("API is running at port: 3000!"))