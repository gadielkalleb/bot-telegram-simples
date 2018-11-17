const Telebot = require('telebot');

class BotTelegram {
  constructor(token, db) {
    if (!token) {
      throw new error('token não informado')
    } else {
      this.Bot = new Telebot(token)
      this.bd = bd
      this.salvar()
      this.Bot.start()

    }
  }
  

  salvar () {
    this.Bot.on('/salvar', async msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
      } else {
        if ((!msg.text.split(' ')[1]) || (!msg.text.split(' ')[2])) {
          this.Bot.sendMessage(msg.from.id, 'é necessario informar valor e descrição depois do comando salvar! Ex: /salvar 12 teste-descrição');
        } else {
          try {
            const valor = msg.text.split(' ')[1];
            const descricao = msg.text.split(' ')[2];
            const msgSave = await this.db.create({ valor, descricao });
            await this.Bot.sendMessage(msg.from.id, `Oi ${msg.from.first_name} anotei o valor de R$${msgSave.valor}, que foi gasto em ${msgSave.descricao}!!!`)
          } catch (error) {
            this.Bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema')
            console.log(error)
          }
        }
      }
    })
  }
}

module.exports = BotTelegram
