module.exports = (Plugin) => {
  return Plugin.Simple('ping', (client, msg) => msg.reply('pong'), '... PONG!');
};