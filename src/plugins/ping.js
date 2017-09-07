const api = require('../api');

module.exports = api.util.simplePlugin('ping', (client, msg) => msg.reply('pong'), '... PONG!');