let ErrorLog = require('./models/errorLog');

module.exports = (err, cb) => {
    let errorLog = new ErrorLog(err);
    errorLog.save(errSave => {
        if (errSave) {
            console.log(errSave);
        }
        if (cb) {
            return cb(errSave);
        }
    });
}