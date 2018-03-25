const api = require('./api');
const helpers = require('./helpers/');

const PROHIBITED_CONFIG_SECTIONS = [
  'discord',
  'client_id',
  'token'
];

/**
 * A list of supported events that plugins may process
 * @private
 */
const KNOWN_EVENTS = helpers.getValues(api.events);

class PluginCollection {
  /**
   * Create a new plugin collection, validating the scanned plugins
   * @param {Function[]} plugins - the array of plugin setup functions
   */
  constructor(plugins){
    if(!plugins) plugins = [];
    if(!(plugins instanceof Array)){
      throw new Error('plugins must be provided as an array of functions');
    }
    for(let p of plugins){
      if(!(p instanceof api.Plugin)){
        throw new Error('plugins must export an instance of api.Plugin');
      }
    }

    let duplicatePlugins = helpers.getDuplicates(plugins, plugin => plugin.name);
    if(duplicatePlugins.length){
      throw new Error('The following plugins have duplicate names: ' + duplicatePlugins.map(x=>x.name).join(', '));
    }

    let allCommands = helpers.flatten(plugins.map(p => p.commands));
    let duplicateCommands = helpers.getDuplicates(allCommands, c => c.name);

    if(duplicateCommands.length){
      throw new Error('The following duplicate commands have been detected: ' + duplicateCommands.map(x => x.name).join(', '));
    }

    /**
     * * @member {themisPlugins.Plugin[]} plugins - the array of plugins for this collection
     * the array of plugins for this collection
     * @type {Plugin[]}
    */
    this.plugins = plugins;
  }

  /**
   * Creates a new plugin collection from the specified directory.
   * @param {string} pluginDirectory - the directory where the plugins are found
   * @returns {PluginCollection}
   */
  static create(pluginDirectory){
    let plugins = helpers.requireAll(pluginDirectory);
    return new PluginCollection(plugins);
  }

  /**
   * Retrieves all the commands exposed by plugins.
   * @returns {Command[]}
   */
  getCommands() {
    return helpers.flatten(this.plugins.map(p => p.commands));
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
    let publicConfig = {};
    if(config.hasOwnProperty('public')){
      publicConfig = config.public;
    }

    this.plugins.forEach(plugin => {
      let pluginConfig = { public: publicConfig };
      if(config.hasOwnProperty(plugin.name) && PROHIBITED_CONFIG_SECTIONS.indexOf(plugin.name) < 0) {
        pluginConfig[plugin.name] = config[plugin.name];
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
