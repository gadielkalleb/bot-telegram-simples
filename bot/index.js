require('dotenv').config()
const BotTelegram = require('./controllers/BotTelegram')

global.bots.set('bot-telegram', new BotTelegram(process.env.BOT_TOKEN))