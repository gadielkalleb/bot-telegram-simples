const Telebot = require('telebot');
const { Wit } = require('node-wit')

class BotTelegram {
  constructor(token, db) {
    if (!token && !db) {
      throw new error('bot sem parametros')
    } else {
      this.Bot = new Telebot(token)
      this.db = db

      this.salvar()
      this.exibir()
      this.witMessage()
      this.Bot.start()
    }
  }
  
  salvar() {
    this.Bot.on('/salvar', msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.chat.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
        return false
      } 
      if ((!msg.text.split(' ')[1]) || (!msg.text.split(' ')[2])) {
        this.Bot.sendMessage(msg.from.id, 'é necessario informar valor e descrição depois do comando salvar! Ex: /salvar 12 teste-descrição');
        return false
      } else {
        this.db
          .create({ valor: msg.text.split(' ')[1], descricao:  msg.text.split(' ')[2]})
          .then(() => {
            this.Bot.sendMessage(msg.from.id, `Oi ${msg.from.first_name} anotei o valor de R$${msg.text.split(' ')[1]}, que foi gasto em ${msg.text.split(' ')[2]}!!!`)
          })
          .catch(error => {
            this.Bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema')
            console.log(error)
        })
      }
      
    })
  }

  exibir() {
    this.Bot.on('/exibir', msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.chat.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
        return false
      } else {
        this.db
          .find()
          .sort({ createdAt: -1 })
          .limit(6)
          .then(async gastos => {
            if (gastos.length <= 0 ) {
              this.Bot.sendMessage(msg.from.id, 'Nenhum valor encontrado')
            }
            for (let i = 0; i < gastos.length; i++) {
              let li = gastos[i]
              await this.Bot.sendMessage(msg.from.id, `O valor R$${li.valor}, foi gasto em ${li.descricao} no dia ${li.criadoEm}`)
            }
          })
          .catch (error => {
            console.log('error: ',error)
            this.Bot.sendMessage(msg.from.id, 'não foi possivel retornar a lista de gastos')
        }) 
      }
    })
  }

  witMessage() {
    this.Bot.on('text', msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.chat.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
        return false
      } else {
        const client = new Wit({
          accessToken: process.env.WIT_TOKEN
        });
        client.message(msg.text).then(response => {
          Object.keys(response.entities).forEach(res => {
            console.log(res == 'salvar')
          })
          console.log(response.entities)
        })
      }
    })
  }
}

module.exports = BotTelegram
