const Discord = require('discord.js');
const config = require('../config/config');
const helpers = require('./helpers');

const pluginsDirectory = helpers.resolvePath(__dirname, 'plugins');

const plugins = helpers.loadPlugins(pluginsDirectory);
plugins.initialize(config);

const commands = plugins.getCommandHash();

/**
 * Method that runs the Commands
 * @param  {Function} cmd  - the command we want to call
 * @param  {Object} bot    - the client object
 * @param  {Object} msg    - the event that triggered the command
 * @param  {String} suffix - any child commands
 */
const callCmd = (cmd, bot, msg, suffix) => {
  try{
    cmd(bot, msg, suffix);
  } catch(err){
    bot.emit('error', err);
  }
};

const handleMessage = (client, msg) => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return;
  }

  const command = msg.content.toLowerCase().split(' ')[0].substring(1);
  const suffix = msg.content.substring(command.length + 2);
  const cmd = commands[command];

  if (cmd) {
    callCmd(cmd, client, msg, suffix);
  }
  return;
};

/**
 * Start Method of the bot
 * @param  {Object} rollbar
 */
const start = () => {
  const client = new Discord.Client();

  client.on('message', (msg) => handleMessage(client, msg));
  plugins.configureEvents(client);

  client.login(config.token)
    .then(() => {
      console.info(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
      console.info(`Command prefix: ${config.prefix}`);

      client.generateInvite(['READ_MESSAGES', 'SEND_MESSAGES', 'MENTION_EVERYONE', 'EMBED_LINKS'])
        .then(link => {
          console.info(`Invite the bot: ${link}`);
        });
    });
};

module.exports = {
  start
};