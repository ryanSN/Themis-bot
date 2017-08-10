const ping = (bot, evt) => {
  evt.reply('pong');
  return;
};

const register = robot => {
  robot.addCommand('ping', ping);
};

module.exports = register;
