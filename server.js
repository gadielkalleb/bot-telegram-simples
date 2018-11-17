const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const mongodb = require('./db/mongoDb')

const port = process.env.PORT

global.bots = new Map()

app.get('/', (req, res) => {
  res.send('funcionando')
})

app.listen(port, () => {
  console.log(`server rodando na porta ${port}`)
  mongodb.start()
})
