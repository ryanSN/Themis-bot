const helpers = require('./helpers/');
const KNOWN_EVENTS = require('./events');

/**
 * A setup function called after plugins have been validated, allowing each
 * plugin to access configuration values.
 * @callback PluginSetupCallback
 * @memberof module:themis/api
 * @param {*} config - an object with a "public" property, as well as a property named the same as this plugin
 */

/**
 * The event strings emitted by discord.js
 * @private
 * @type {string[]}
 */
const validEvents = helpers.getValues(KNOWN_EVENTS);

/**
 * Defines a plugin, its commands, and the events it can handle
 */
class Plugin {
  /**
   * Create a new plugin
   * @param {string} name - the (unique) name of the plugin
   * @param {Command[]} commands - the array of the plugin's commands
   * @param {*} events - the hash of event callback functions
   * @param {module:themis/api.PluginSetupCallback} init - the setup function for this plugin
   */
  constructor(name, commands, events, init) {
    if (!name) {
      throw new Error('You must specify a name for your plugin.');
    }
    if (!commands) {
      commands = [];
      console.warn('No commands specified for plugin ' + name);
    }
    if (!(commands instanceof Array)) {
      throw new Error('You must specify commands as an array of command definitions.');
    }

    if (!events) {
      events = {};
    } else {
      let tempEvents = {};
      for (let declaredEvent in events) {
        if (validEvents.indexOf(declaredEvent) > -1) {
          tempEvents[declaredEvent] = events[declaredEvent];
        }
      }
      events = tempEvents;
    }

    if (init == null) {
      init = () => {};
    }
    if (!(init instanceof Function)) {
      throw new Error('Invalid init function type: ' + typeof init);
    }
    /** @prop {string} name - the plugin's name */
    this.name = name;
    /** @prop {Command[]} commands - the plugin's chat commands */
    this.commands = commands;
    /** @prop {Object} events - the events the plugin can handle */
    this.events = events;
    /** @prop {module:themis/api.PluginSetupCallback} init - the plugin's initialization function */
    this.init = init;
  }
}

module.exports = Plugin;
