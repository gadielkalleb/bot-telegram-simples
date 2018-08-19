require('dotenv').config()
const chalk = require('chalk')
const gastosGerais = require('../db/GastosGerais')


exports.salvar = async (bot ,msg) => {
	if (msg.chat.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
		bot.sendMessage(msg.from.id, 'Você não é meu criador não vou atender suas solicitações')
	} else {
		try {
			const valor = msg.text.split(' ')[1],
				descricao = msg.text.split(' ')[2],
				msgSave = await gastosGerais.create({ valor, descricao })
			bot.sendMessage(msg.from.id, `Oi ${msg.from.first_name} anotei o valor de ${msgSave.valor} reais, que foi gasto em ${msgSave.descricao}!!!`)
		} catch (error) {
			console.log(chalk.red.bold('Error: '), chalk.bold(err))
			bot.sendMessage('Não foi possivel salvar seus gastos, houve algum problema')
		}
	}
}

exports.exibir = async (bot , msg) => {
	if (msg.chat.username !== process.env.USERNAME && msg.from.id !== process.env.ID) {
		bot.sendMessage(id, 'Você não é meu criador não vou atender suas solicitações')
	} else {
		try {
			const msgExibir = await gastosGerais.find({}).sort({ createdAt: -1 }).limit(6)
			for (let i = 0; i < msgExibir.length; i++) {
				let li = msgExibir[i]
				await bot.sendMessage(msg.from.id, `O valor ${li.valor} reais, foi gasto em ${li.descricao} no dia ${li.criadoEm}`)
			}
		} catch (error) {
			console.log(chalk.red.bold('Error: '), chalk.bold(error))
			bot.sendMessage(msg.from.id, 'não foi possivel retornar a lista de gastos')
		}
	}
}

