'use strict';
const _ = require('lodash');
const Plugin = require('./Plugin');

const PROHIBITED_CONFIG_SECTIONS = [
  'discord',
  'client_id',
  'token'
];

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

class PluginCollection {
  /**
   * Create a new plugin collection, validating the scanned plugins
   * @param {Function[]} protoPlugins - the array of plugin setup functions
   */
  constructor(protoPlugins){
    if(!protoPlugins) protoPlugins = [];
    if(!(protoPlugins instanceof Array)){
      throw new Error('plugins must be provided as an array of functions');
    }
    if(!_.every(protoPlugins, x => x instanceof Function)){
      throw new Error('plugins must be provided as an array of functions');      
    }

    let plugins = protoPlugins.map(x => x(Plugin));

    let duplicatePlugins = _(plugins)
      .groupBy(p => p.name)
      .map((val, key) => ({ name: key, count: val.length }))
      .filter(x => x.count > 1)
      .value();
    if(duplicatePlugins.length){
      throw new Error('The following plugins have duplicate names: ' + duplicatePlugins.map(x=>x.name).join(', '));
    }
    let duplicateCommands = _(plugins).flatMap(p => p.commands)
      .groupBy(c => c.name)
      .map((val,key) => ({ name: key, count: val.length }))
      .filter(x=> x.count > 1)
      .value();
    if(duplicateCommands.length){
      throw new Error('The following duplicate commands have been detected: ' + duplicateCommands.map(x => x.name).join(', '));
    }
    /** @member {Plugin[]} plugins - the array of plugins for this collection */
    this.plugins = plugins;
  }

  /**
   * Retrieves all the commands exposed by plugins.
   * @returns {Plugin.Command[]}
   */
  getCommands() {
    return _.flatMap(this.plugins, p => p.commands);
  }

  /**
   * Retrieves the hash of commands provided by plugins
   * @returns {Object}
   */
  getCommandHash() {
    let result = {};
    this.getCommands().forEach(cmd => {
      result[cmd.name] = cmd.command;
    });
    return result;
  }

  /**
   * Initializes each plugin with a scoped chunk of the config data matching its plugin name
   * @param {*} config 
   */
  initialize(config) {
    this.plugins.forEach(plugin => {
      let pluginConfig = {};
      if(config.hasOwnProperty(plugin.name) && PROHIBITED_CONFIG_SECTIONS.indexOf(plugin.name) < 0){
        pluginConfig = config[plugin.name];
      }
      plugin.init(pluginConfig);
    });
  }

  /**
   * Configures events onto the discord client event emitter
   * @param {*} client - the Discord.js client
   */
  configureEvents(client) {
    this.plugins.map(x => x.events)
      .forEach(handlers => {
        KNOWN_EVENTS.forEach(evt => {
          if(handlers[evt] instanceof Function){
            client.on(evt, handlers[evt]);
          }
        });
      });
  }
}

module.exports = PluginCollection;