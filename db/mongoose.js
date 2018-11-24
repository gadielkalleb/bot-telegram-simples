const mongoose = require('mongoose');
const { db } = require('../config/dev')

mongoose.Promise = require('bluebird')

console.time('tempo de execução do mongoose')

mongoose.set('useCreateIndex', true)
mongoose.connect(db, { useNewUrlParser: true });

console.timeEnd('tempo de execução do mongoose')

module.exports = mongoose;