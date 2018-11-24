const express = require('express')
const path = require('path')

const router = express.Router()
/**
 * @description middleware de autenticação, ve se o usuario esta valido para estar na sessão
 */
const authMiddleware = require(path.resolve('./api/middlewares/auth'))
/**
 * @description controller para as rotas de gasto mensal
 */
const despesas = require('../despesas')


router.use(authMiddleware)
router.post('/save', despesas.save)
router.get('/show', despesas.show)

module.exports = router
