const ListaDesejosController = require('./controller/listadesejosController')
const ListaDesejo = require('./model/listadesejos')

module.exports = new ListaDesejosController(ListaDesejo)