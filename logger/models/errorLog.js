const path = require('path');

const mongoose = require(path.resolve('./db/mongoConf'));

let errorLogSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    strict: false
});

module.exports = mongoose.model('errorLog', errorLogSchema);