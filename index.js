const bot = require('./botConf')

const { salvar, exibir } = require('./controllers/botCommands')

bot.on('/salvar', salvar)
bot.on('/exibir', exibir)

bot.start()
