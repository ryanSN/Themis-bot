const uptime = (bot, evt) => {
  evt.reply(`My current uptime is : ${bot.uptime} seconds`);
  return;
};

exports.name = 'uptime';
exports.cmd = uptime;