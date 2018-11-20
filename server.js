const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const { port, botToken } = require('./config/dev')

global.bots = new Map()

const api = require('./api')
const BotTelegram = require('./bot/controllers/BotTelegram')
const gastoDb = require('./bot/models/GastosGerais')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api', api)

app.listen(port, () => {
  console.log(`server rodando na porta ${port}`)
  global.bots.set('bot-telegram', new BotTelegram(botToken, gastoDb))
})
