const Telebot = require('telebot');
const witClient = require('../../wit')
const payload = ({id, first_name}, { amount_of_money, local_search_query }) => ({
  msgId: id,
  first_name,
  valor: amount_of_money[0].value,
  descricao: local_search_query[0].value
})

class BotTelegram {
  constructor(token, db) {
    if (!token && !db) {
      throw new error('bot sem parametros')
    } else {
      Object.assign(this, { db, witClient, Bot: new Telebot(token)} )
      this.watchMessage()
      this.Bot.start()
    }
  }
  
  async salvar({ msgId, first_name, valor, descricao }) {
    try {
      await this.db.create({ valor, descricao })
      this.Bot.sendMessage(msgId, `Oi ${first_name} salvei o valor de R$ ${valor}, que foi gasto ${descricao}!!!`)
    } catch (error) {
      console.log(error)
      this.Bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema!')
    }
  }

  // exibir() {
  //   this.db
  //     .find()
  //     .sort({ createdAt: -1 })
  //     .limit(6)
  //     .then(async gastos => {
  //       if (gastos.length <= 0 ) {
  //         this.Bot.sendMessage(msg.from.id, 'Nenhum valor encontrado')
  //       }
  //       for (let i = 0; i < gastos.length; i++) {
  //         let li = gastos[i]
  //         await this.Bot.sendMessage(msg.from.id, `O valor R$${li.valor}, foi gasto em ${li.descricao} no dia ${li.criadoEm}`)
  //       }
  //     })
  //     .catch (error => {
  //       console.log('error: ',error)
  //       this.Bot.sendMessage(msg.from.id, 'não foi possivel retornar a lista de gastos')
  //   }) 
      
  // }

  watchMessage() {
    this.Bot.on('text', async msg => {
      if (msg.from.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
        return this.Bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
      }
      try {
        const response = await this.witClient.witSendMessage(msg.text)
        if (Object.keys(response.entities).includes('salvar')) {
          this.salvar(payload(msg.from, response.entities))
        } 
        else if(Object.keys(response.entities).includes('exibir')) {}
        else { console.log('não deu')}
      } catch (e) {
        console.log(e)
         this.Bot.sendMessage(msg.from.id, 'Erro ao processar sua solicitação')
      }
    })
  }
}

module.exports = BotTelegram
