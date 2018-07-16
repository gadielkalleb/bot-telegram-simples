require('dotenv').config()
const chalk = require('chalk')
const gastosGerais = require('../db/GastosGerais')
const bot = require('../botConf')

const salvar = async (msg) => {
	const { username } = msg.chat
	const { id, first_name } = msg.from
	// console.log(chalk.green.bold('conteudo msg'), msg)
	if(username !== process.env.USERNAME && id !== process.env.ID) {
		bot.sendMessage(id, 'Você não é meu criador não vou atender suas solicitações')
	} else {
    const valor = msg.text.split(' ')[1]
    const descricao = msg.text.split(' ')[2]
		try {
			await gastosGerais.create({ valor, descricao })
			bot.sendMessage(id, `Oi ${first_name} anotei o valor de ${valor} reais, que foi gasto em ${descricao}!!!`)
		} catch (error) {
			console.log(chalk.red.bold('Error: '), chalk.bold(error))
			bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema')
		}
	}
}

const exibir = async (msg) => {
	const { username } = msg.chat
	const { id } = msg.from

  if(username !== process.env.USERNAME && id !== process.env.ID) {
		bot.sendMessage(id, 'Você não é meu criador não vou atender suas solicitações')
	} else {
		try {
			const lista = await gastosGerais.find({}).limit(5).sort({ createdAt: -1 })
			lista.forEach(li => bot.sendMessage(id, `O valor ${li.valor} reais, foi gasto em ${li.descricao} no dia ${li.criadoEm}`))
		} catch (error) {
			console.log(chalk.red.bold('Error: '), chalk.bold(error))
			bot.sendMessage(msg.from.id, 'não foi possivel retornar a lista de gastos')
		}
  }
}

module.exports = { salvar, exibir }