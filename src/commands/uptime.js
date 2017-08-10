const uptime = (bot, evt) => {
  evt.reply(`My current uptime is : ${bot.uptime} seconds`);
  return;
};

const register = robot => {
  robot.addCommand('uptime', uptime);
};

module.exports = register;
