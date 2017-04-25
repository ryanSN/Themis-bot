const Discord  = require('discord.js');
const config   = require('../config/config');
const commands = require('./commands');

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

/**
 * Start Method of the bot
 * @param  {Object} rollbar
 */
const start = (bot, rollbar) => {
  bot = bot || new Discord.Client();
  // handle any errors from lib / discord
  bot.on('error', err => {
    rollbar.log(err);
    console.log(err);
  });

  // handles diconnect logging
  bot.on('disconnect', (error) => {
    if (error) {
      rollbar.log(error);
    }
    console.log('disconnect');
  });

  bot.login(config.token);

  bot.on('ready', () => {
    console.log(`Ready to serve in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`);
  });

  bot.on('message', (msg) => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) {
      return;
    }

    const command = msg.content.toLowerCase().split(' ')[0].substring(1);
    const suffix = msg.content.substring(command.length + 2);
    const cmd = commands[command];

    if (cmd) {
      callCmd(cmd, bot, msg, suffix);
    }
    return;
  });

  return;
};

module.exports = {
  start
};
