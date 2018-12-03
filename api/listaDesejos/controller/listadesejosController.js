let ListaDesejos

class ListaDesejosController {
  constructor(model) {
    ListaDesejos = model
  }
  async saveProduto (req, res) {
    try {
      const produto = await ListaDesejos.create(req.body)
      res.status(200).send({
        ok: true,
        produto,
      })
    } catch (error) {
      res.status(400).send({
        ok: false,
        message: 'Não foi possivel salvar seu produto na lista de desejos nesse momento tente mais tarde!',
      })
    }
  }
  
  async getProduto (req, res) {
    try {
      const produtos = await ListaDesejos.find({})
      res.status(200).send({ ok: true, produtos })
    } catch (error) {
      res.status(400).send({ ok: false, message: 'Error processing get Produto' })
    }
  }
}

module.exports = ListaDesejosController