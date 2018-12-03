const AuthController =  require('./controller/authController')
const User = require('./model/User')

module.exports = new AuthController(User)