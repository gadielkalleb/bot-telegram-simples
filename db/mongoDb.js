const mongoose = require('mongoose');
const { db } = require('../config/dev')

console.time('tempo de execução do mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect(db, { useNewUrlParser: true });
mongoose.Promise = require('bluebird')
console.timeEnd('tempo de execução do mongoose')

module.exports = mongoose;