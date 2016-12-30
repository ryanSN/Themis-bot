const uptime = (bot, evt) => {
  evt.reply(`My current uptime is : ${bot.uptime} seconds`);
  return;
};

module.exports = uptime;
