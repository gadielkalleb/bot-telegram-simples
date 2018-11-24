const express = require('express')
const router = express.Router()

const { auth, despesas, listaDesejos } = require('./routes')

router.use('/auth', auth)
router.use('/despesas', despesas)
router.use('/listadesejos', listaDesejos)

module.exports = router
