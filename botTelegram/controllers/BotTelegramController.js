const Telebot = require('telebot');
const witClient = require('../../wit')

class BotTelegram {
  constructor(token, db) {
    if (!token && !db) {
      throw new error('bot sem parametros')
    } else {
      Object.assign(this, { db, witClient, Bot: new Telebot(token)} )
      this.exibir()
      this.watchMessage()
      this.Bot.start()
    }
  }
  
  salvar(payload) {
    this.db
      .create({ valor: payload.valor, descricao: payload.descricao })
      .then(() => {
        this.Bot.sendMessage(payload.msgId, `Oi ${payload.first_name} salvei o valor de R$ ${payload.valor}, que foi gasto ${payload.descricao}!!!`)
      })
      .catch(error => {
        console.log(error)
        this.Bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema!')
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

  watchMessage() {
    this.Bot.on('text', msg => {
      if (msg.chat.username !== process.env.USERNAME && msg.chat.id !== process.env.ID) {
        this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
      } else {
        this.witClient.witSendMessage(msg.text)    
          .then(response => {
            if (Object.keys(response.entities).includes('salvar')) {
              let payload = {
                msgId: msg.from.id,
                first_name: msg.from.first_name,
                valor: response.entities.amount_of_money[0].value,
                descricao: response.entities.local_search_query[0].value
              }
              this.salvar(payload)
            }
          }).catch(e => {
            console.log(e)
            this.Bot.sendMessage(msg.from.id, 'Erro ao processar sua solicitação')
          })
      }
    })
  }
}

module.exports = BotTelegram
