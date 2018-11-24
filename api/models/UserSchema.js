// const mongoose = require('../../db/mongoose')
const { user } = require('./fields')
const schema = require('../../config/schema/create')( user )

module.exports = (mongoose) => new mongoose.Schema(schema);