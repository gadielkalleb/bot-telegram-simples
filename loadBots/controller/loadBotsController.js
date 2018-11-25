const tryBot = (bots) => bots.forEach(robot => global.robots.set(bot._id.toString(), new bot(bot)));
const catchBot = (err) => global.logger.debug(`error loading bot: ${err}`);

let Bot

class LoadBots {
  constructor(model) {
    if (model) {
      Bot = model
    }
  }
  loadAllBots () {
    global.logger.info('Carregando os robos....');
    Bot.find({active:true})
      .populate('roboType database')
      .then(tryBot)
      .catch(catchBot);
  }
} 

module.exports = LoadBots
