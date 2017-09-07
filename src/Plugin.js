'use strict';
/**
 * Defines a chat command
 * @memberof Plugin
 */
class Command{
  /**
   * Create a new command definition
   * @param {string} name - the name of the command
   * @param {Function} command - the function that handles the command's message
   * @param {string} helpText - the help text that would be displayed for this command
   */
  constructor(name, command, helpText){
    if(!name) {
      throw new Error('You must specify a name for your command');      
    }
    if(!(typeof name === 'string')){
      throw new Error('Your command\'s name must be a string.');
    }
    if(/s/.test(name)){
      throw new Error('Your command\'s name may not contain spaces');
    }
    if(!command || !(command instanceof Function)){
      throw new Error('You must supply a command function');
    }
    this.name = name.toLowerCase();
    this.command = command;
    this.helpText = helpText;
  }
}

/**
 * Defines a plugin, its commands, and the events it can handle
 */
class Plugin {
  /**
   * Create a new plugin
   * @param {string} name 
   * @param {Command[]} commands 
   * @param {Object.<string, Function>} events 
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

/**
 * Create command definitions to let your plugin respond to chat messages
 */
Plugin.Command = Command;

/**
 * Create a simple plugin for a single chat command
 * @param {string} name - the chat command's name
 * @param {Function} command - the chat command's function
 * @param {string} [helpText] - the help text for the chat command
 */
Plugin.Simple = (name, command, helpText) => {
  return new Plugin(name, [new Command(name, command, helpText)]);
};

module.exports = Plugin;