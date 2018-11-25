const botTelegramController = require('./controllers/BotTelegramController')
const gastosGerais = require('./model/GastosGerais')
const { botToken } = require('../config/dev')

module.exports = new botTelegramController(botToken, gastosGerais)