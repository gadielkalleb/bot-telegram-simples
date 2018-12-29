const { logger } = require('../../../tools');
const logError = (err) => logger(__filename).error(`error : ${err}`);

const DespesasController = model => ({

   save: async (req, res) => {
    try {
      await model.create(req.body);
      res.status(200).send({
        ok: true,
        message: 'Despesa salva'
      });
    } catch (err) {
      logError(err);
      res.status(400).send({
        ok: false,
        message: 'Não foi possivel salvar seus gastos nesse momento tente mais tarde!',
      })
    }
  },

  show: async (req, res) => {
    try {
      const despesas = await model.find({ user: req.userId })
      res.status(200).send({
        status: 'ok',
        despesas,
      }) 
    } catch (err) {
      logError(err);
      res.status(400).send({
        status: 200,
        message: 'Not found',
      })
    }
  }
});

module.exports = DespesasController;
