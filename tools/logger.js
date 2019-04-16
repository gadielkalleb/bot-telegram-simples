const Logger = require('logplease');

function newLog(fileName) {
  return Logger.create(fileName);
}

module.exports = {
  logInfo: (fileName, msg) => newLog(fileName).info(msg),
  logError: (fileName, msg) => newLog(fileName).error(msg),
};
