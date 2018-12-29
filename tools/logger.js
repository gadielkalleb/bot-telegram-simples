const Logger = require('logplease');

module.exports = nameFile => {
  return Logger.create(nameFile);
};
