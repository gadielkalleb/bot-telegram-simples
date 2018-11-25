const path = require('path')

const mongoose = require(path.resolve('./db/mongoose'))

const BotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: true },
  userName: { type: String, required: true },
  active: { type: Boolean, default: false }
})

module.exports = mongoose.model('bots', BotSchema)