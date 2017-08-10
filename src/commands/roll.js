const RollDice = require('rolldice');

const roll = (bot, msg, suffix) => {
  let rollResult = new RollDice(suffix).toString();
  msg.reply(rollResult);
};

const register = robot => {
  robot.addCommand('roll', roll);
};

module.exports = register;