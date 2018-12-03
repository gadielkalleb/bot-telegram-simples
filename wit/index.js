const witClient = require('./controller/witClient')

module.exports = new witClient(process.env.WIT_TOKEN)