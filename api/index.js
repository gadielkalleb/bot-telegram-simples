const express = require('express')
const router = express.Router()

const { auth, gastosMensais, listaDesejos } = require('./routes')

router.use('/auth', auth)
router.use('/gastosmensais', gastosMensais)
router.use('/listadesejos', listaDesejos)

module.exports = router
