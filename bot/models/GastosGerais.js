const path = require('path')
const moment = require('moment')

const mongoose = require(path.resolve('./db/mongoose'))

const GastosGeraisSchema = new mongoose.Schema({
  valor: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

GastosGeraisSchema
  .virtual('criadoEm')
  .get(function () {
    return moment(this.createdAt).format('DD-MM-YYYY');
  })

const gastosGerais = mongoose.model('GastosGerais', GastosGeraisSchema)

module.exports = gastosGerais
