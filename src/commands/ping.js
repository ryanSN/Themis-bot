const ping = (bot, evt) => {
  evt.reply('pong');
  return;
};

exports.name = 'ping';
exports.cmd = ping;