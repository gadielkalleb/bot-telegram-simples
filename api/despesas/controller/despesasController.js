let Despesas

class DespesasController {
  constructor(model) {
    if (model) {
      Despesas = model
    }
  }

  async save (req, res) {
    const despesa = await Despesas.create(req.body)
    try {
      res.status(200).send({
        ok: true,
        despesa,
      })
    } catch (err) {
      res.status(400).send({
        ok: false,
        message: 'Não foi possivel salvar seus gastos nesse momento tente mais tarde!',
      })
    }
  }
  
  async show (req, res) {
    const despesas = await Despesas.find({ user: req.userId })
    try {
      res.status(200).send({
        status: 'ok',
        despesas,
      })
    } catch (error) {
      res.status(400).send({
        status: 200,
        message: 'Not found',
      })
    }
  }

}

module.exports = DespesasController