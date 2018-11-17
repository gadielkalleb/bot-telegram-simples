require('dotenv').config()
module.exports = {
  port: process.env.PORT,
  db: process.env.MONGODB || 'mongodb://localhost:27017/gastos-gerais',
  botToken: process.env.BOT_TOKEN
}