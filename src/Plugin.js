const helpers = require('./helpers/');
const KNOWN_EVENTS = require('./events');

/**
 * The event strings emitted by discord.js
 * @type {string[]}
 */
const validEvents = helpers.getValues(KNOWN_EVENTS);

/**
 * Defines a plugin, its commands, and the events it can handle
 * @class Plugin
 */
class Plugin {
  /**
   * Create a new plugin
   * @param {string} name 
   * @param {Command[]} commands 
   * @param {*} events 
   * @param {Function} init 
   */
  constructor(name, commands, events, init){
    if(!name){
      throw new Error('You must specify a name for your plugin.');
    }
    if(!commands) {
      commands = [];
      console.warn('No commands specified for plugin ' + name);
    }
    if(!(commands instanceof Array)){
      throw new Error('You must specify commands as an array of command definitions.');
    }

    if(!events){
      events = {};
    } else {
      let tempEvents = {};
      for(let declaredEvent in events){
        if(validEvents.indexOf(declaredEvent) > -1){
          tempEvents[declaredEvent] = events[declaredEvent];
        }
      }
      events = tempEvents;
    }

    
    if(init == null){
      init = () => {};
    }
    if(!(init instanceof Function)){
      throw new Error('Invalid init function type: ' + typeof init);
    }
    /** @prop {string} name - the plugin's name */
    this.name = name;
    /** @prop {Command[]} commands - the plugin's chat commands */
    this.commands = commands;
    /** @prop {Object} events - the events the plugin can handle */
    this.events = events;
    /** @prop {Function} init - the plugin's initialization function */
    this.init = init;
  }
}

module.exports = Plugin;