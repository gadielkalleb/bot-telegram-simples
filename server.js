const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const { port } = require('./config')

const api = require('./api')
const botTelegram = require('./botTelegram')

global.bots = new Map()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api', api)

app.listen(port, () => {
  console.log(`server rodando na porta ${port}`)

  global.bots.set('bot-telegram', botTelegram)
})
