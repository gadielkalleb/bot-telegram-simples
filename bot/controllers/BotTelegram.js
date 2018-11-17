const Telebot = require('telebot');

class BotTelegram {
  constructor(token) {
    if (!token) {
      throw new error('token não informado')
    } else {
      this.Bot = new Telebot(token)
      
      this.salvar()
      this.Bot.start()

    }
  }
  

  salvar () {
    this.Bot.on('text', msg => {
      console.log(msg)
    })
  }
}

module.exports = BotTelegram
