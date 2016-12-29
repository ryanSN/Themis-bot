'use strict';

const Discord = require('discord.js');
const config = require('./config/config');
const rollbar = require('rollbar');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.content[0] === config.prefix) {
    const command = message.content.toLowerCase().split(' ')[0].substring(1);
    const suffix = message.content.substring(command.length + 2);
    const cmd = commands[command];

    if (cmd) callCmd(cmd, command, client, message, suffix);
    return;
  }
});

client.login(config.token);
rollbar.init(config.rollbar);

var options = {
  exitOnUncaughtException: true
};
rollbar.handleUncaughtExceptions(config.rollbar, options);
