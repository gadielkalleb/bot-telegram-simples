const express = require('express')

const router = express.Router()

/**
 * @description controller para registro, autenticação e reset de password
 */
const authController = require('../auth')

router.post('/register', authController.register)
router.post('/authenticate', authController.authenticate)
router.post('/forgot_password', authController.forgot_password)

module.exports = router
