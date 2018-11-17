const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const mongodb = require('./db/mongoDb')
const { db, port, botToken } = require('./config/dev')

global.bots = new Map()

const BotTelegram = require('./bot/controllers/BotTelegram')
const gastoDb = require('./bot/models/GastosGerais')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send('funcionando')
})

app.listen(port, () => {
  console.log(`server rodando na porta ${port}`)
  mongodb.start(db)
  global.bots.set('bot-telegram', new BotTelegram(botToken, gastoDb))
})
