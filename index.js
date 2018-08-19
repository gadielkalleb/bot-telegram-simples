require('dotenv').config()
const Telebot = require('telebot');
const path = require('path');
const bot = new Telebot(process.env.BOT_TOKEN);

require(path.resolve('./bot'))(bot);

bot.start();
