require('dotenv').config()

const Telebot = require('telebot')
const bot = new Telebot(process.env.BOT_TOKEN)

module.exports = bot