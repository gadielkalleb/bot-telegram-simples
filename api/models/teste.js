const mongoose = require('../../db/mongoose')
const UserSchema = require('./UserSchema')(mongoose)
const getModuleName = require('../../config/schema/getName')

console.log(UserSchema)
module.exports = mongoose.model(getModuleName(__dirname), UserSchema)
