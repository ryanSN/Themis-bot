const ping = (bot, evt) => {
  console.log(evt);
  return evt.reply('pong');
};

module.exports = ping;
