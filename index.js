const Telebot = require('telebot')
const express = require('express')

const app = express()
const bot = new Telebot('')

app.use((req, res, next) => {
	next()
})

bot.on('text', (msg) => {
	if (msg.text =='oi') bot.sendMessage(msg.from.id,'fala seu pistola')
        else bot.sendMessage(msg.from.id,'oi tudo bem')
})
	

app.listen(3100, () => {
	console.log('app rodando...')
	
	bot.start()
	bot.on('text', (msg) => console.log(msg.text))
})

