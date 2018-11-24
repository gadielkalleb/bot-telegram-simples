const express = require('express')
const path = require('path')

const router = express.Router()

const listaDesejos = require('../listaDesejos')
/**
 * @description middleware de autenticação, ve se o usuario esta valido para estar na sessão
 */
const authMiddleware = require(path.resolve('./api/middlewares/auth'))

router.use(authMiddleware)
router.get('/produtos', listaDesejos.getProduto)
router.post('/produtos/create', listaDesejos.saveProduto)

module.exports = router
