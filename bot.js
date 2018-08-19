const botCommands = require('./controllers/botCommands')

module.exports = bot => {
  bot.on('/salvar', botCommands.salvar.bind(null, bot))
  bot.on('/exibir', botCommands.exibir.bind(null, bot))
}
