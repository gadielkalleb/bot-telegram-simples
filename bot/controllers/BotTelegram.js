const Telebot = require('telebot');

class BotTelegram {
  constructor(token, db) {
    if (!token) {
      throw new error('token não informado')
    } else {
      this.Bot = new Telebot(token)
      this.db = db
      this.salvar()
      this.exibir()
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

  exibir() {
    this.Bot.on('/exibir', async msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
      } else {
        try {
          const msgExibir = await this.db.find({}).sort({ createdAt: -1 }).limit(6)
          for (let i = 0; i < msgExibir.length; i++) {
            let li = msgExibir[i]
            await this.Bot.sendMessage(msg.from.id, `O valor R$${li.valor}, foi gasto em ${li.descricao} no dia ${li.criadoEm}`)
          }
        } catch (error) {
          console.log('error: ',error)
          this.Bot.sendMessage(msg.from.id, 'não foi possivel retornar a lista de gastos')
        }
      }
    })
  }
}

module.exports = BotTelegram
