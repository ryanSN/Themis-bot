const Discord = require('discord.js');
const _ = require('lodash');
const config = require('../config/config');
const scanPlugins = require('./plugin');

let robot = scanPlugins(_.omit(config, ['token', 'client_id']));

/**
 * Method that runs the Commands
 * @param  {Function} cmd  - the command we want to call
 * @param  {Object} bot    - the client object
 * @param  {Object} evt    - the event that triggered the command
 * @param  {String} suffix - any child commands
 */
const callCmd = (cmd, bot, evt, suffix) => {
  cmd(bot, evt, suffix);
};

const handleError = (client, err) => {  
  robot.errorHandlers.forEach(handler => handler(err));
};

const handleMessage = (client, msg) => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return;
  }

  const command = msg.content.toLowerCase().split(' ')[0].substring(1);
  const suffix = msg.content.substring(command.length + 2);
  const cmd = robot.commands[command];

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

  client.on('error', err => handleError(client, err));
  client.on('message', (msg) => handleMessage(client, msg));
  client.on('disconnect', evt => {
    console.info(`[Disconnected] Clean: ${evt.wasClean} Code ${evt.code}; Reason: ${evt.reason}`);
  });
  client.on('reconnecting', () => {
    console.info('[Reconnecting] Attempting to reconnect to discord...');
  });
  client.on('guildCreate', guild => {
    console.info(`[Join Server] ${guild.name}`);
  });
  client.on('ready', () => {
    console.info('[Ready] Bot is ready');
  });

  client.login(config.token)
    .then(() => {
      console.info(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
      
      client.generateInvite(['READ_MESSAGES', 'SEND_MESSAGES', 'MENTION_EVERYONE', 'EMBED_LINKS'])
        .then(link => {
          console.info(`Invite the bot: ${link}`);
        });
    });
};

module.exports = {
  start
};
