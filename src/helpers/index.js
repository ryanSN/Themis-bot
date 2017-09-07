'use strict';
const fs = require('fs');
const path = require('path');
const PluginCollection = require('../PluginCollection');

/**
 * AN helper.
 */
const helper = () => {
};

/**
 * Shortcut to path.resolve(string...)
 * @param {...string} args - the path parts to join and resolve
 */
function resolvePath() {
  return path.resolve.apply(path, arguments);
}

/**
 * Scan a directory, returning absolute paths for all files in that path
 * @param {string} directoryPath - the path to scan
 */
const scanDirectory = (directoryPath) => {
  directoryPath = path.resolve(directoryPath);
  return fs.readdirSync(directoryPath)
    .map(fname => {
      return path.join(directoryPath, fname);
    });
};

/**
 * Require all of the JS or JSON files in a directory and return the array
 * @param {string} directoryPath - the path to scan
 * @param {Function} [validate] - a function to ensure that the required file presents the correct API
 */
const requireAll = (directoryPath, validate) => {
  if(!validate || !(validate instanceof Function)){
    validate = x => !!x;
  }

  return scanDirectory(directoryPath)
    .map(filename => {
      let ext = (path.extname(filename) || '').toLowerCase();
      if(ext === '.js' || ext === '.json'){
        return require(filename);
      } else {
        return null;
      }
    })
    .filter(validate);
};

/**
 * Scan a directory to load chat commands
 * @param {string} commandDirectory - the directory containing commands
 */
const loadCommands = (commandDirectory) => {
  return requireAll(commandDirectory, x => x && typeof x.name === 'string' && x.name.trim() && x.cmd instanceof Function)
    .reduce((commands, plugin) => {
      let lcName = plugin.name.toLowerCase();
      if(!commands.hasOwnProperty(lcName)){
        commands[lcName] = plugin.cmd;
      } else {
        console.warn(`Command handler already registered for ${plugin.name}`);
      }
      return commands;
    }, {});
};

/**
 * A list of supported events that plugins may process
 */
const KNOWN_EVENTS = [
  'ready',
  'error',
  'disconnect',
  'reconnecting',
  'guildCreate'
];

/**
 * Load event handling plugins, returning an array of initialization functions.
 * @param {*} client - the discord.js client
 * @param {string} eventsDirectory - the directory containing the events helpers
 * @returns {Array<Function>}
 */
const loadEvents = (client, eventsDirectory) => {
  let initStack = [];
  requireAll(eventsDirectory)
    .forEach(handlers => {
      KNOWN_EVENTS.forEach(evt => {
        if(handlers[evt] instanceof Function){
          client.on(evt, handlers[evt]);
        }
      });
      if(handlers.init){
        initStack.push(handlers.init);
      }
    });
  return initStack;
};

/**
 * Loads plugins from the specified directory
 * @param {string} pluginsDirectory - where to load plugins from
 * @returns {PluginCollection} 
 */
const loadPlugins = (pluginsDirectory) => {
  let plugins = requireAll(pluginsDirectory, x => x instanceof Function);
  
  return new PluginCollection(plugins);
};

module.exports = {
  helper,
  resolvePath,
  scanDirectory,
  requireAll,
  loadCommands,
  loadEvents,
  loadPlugins
};