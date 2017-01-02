const rollbar = require('rollbar');
const config  = require('../config/config');
const app     = require('./app');
const Discord = require('discord.js');

rollbar.init(config.rollbar);
const bot = new Discord.Client();

app.start(bot, rollbar);

var options = {
  exitOnUncaughtException: true
};
rollbar.handleUncaughtExceptions(config.rollbar, options);
