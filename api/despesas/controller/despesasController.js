let Despesas

class DespesasController {
  constructor(model) {
    if (model) {
      Despesas = model
    }
  }

  save (req, res) {
    Despesas
      .create(req.body)
      .then(() => {
        res.status(200).send({
          ok: true,
          message: 'Despesa salva'
        })
      })
      .catch(err => {
        res.status(400).send({
          ok: false,
          message: 'Não foi possivel salvar seus gastos nesse momento tente mais tarde!',
        })
      })
  }

  show (req, res) {
    Despesas
      .find({ user: req.userId })
      .then(despesas => {
        res.status(200).send({
          status: 'ok',
          despesas,
        })
      })
      .catch(error => {
        res.status(400).send({
          status: 200,
          message: 'Not found',
        })
    })
  }
}

module.exports = DespesasController