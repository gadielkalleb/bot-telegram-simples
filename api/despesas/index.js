const DespesasController = require('./controller/despesasController')
const Despesas = require('./model/despesas')

module.exports = new DespesasController(Despesas)
