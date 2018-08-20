require('dotenv').config()
const Telebot = require('telebot');
const path = require('path');
const bot = new Telebot(process.env.BOT_TOKEN);

bot.on('text', (msg) => {
  if (msg.chat.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
		bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
  } else {
    require(path.resolve('./bot'))(bot, msg);
  }
}

bot.start();
