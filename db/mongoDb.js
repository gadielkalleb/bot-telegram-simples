require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

function MongooseStart () {}

MongooseStart.prototype.start = function () {
  console.time('tempo de execução do mongoose conect')
  mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log('conectado com o mongodb'))
    .catch(e => console.log('erro ao conectar ao mongodb', e))
  console.timeEnd('tempo de execução do mongoose conect')
}

module.exports = new MongooseStart()