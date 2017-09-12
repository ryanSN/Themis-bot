const Command = require('./Command');
const Plugin = require('./Plugin');
const events = require('./events');

/** @module themis/api */
/**
 * The Command constructor
 * @type {Command}
 */
exports.Command = Command;
/**
 * The Plugin constructor
 * @type {Plugin}
 */
exports.Plugin = Plugin;
/**
 * The events supported by Themis
 * @namespace events
 * @memberof module:themis/api
 */
exports.events = events;

/**
 * Utility functions to assist defining a plugin
 * @namespace util
 * @memberof module:themis/api
 */
exports.util = {
  /**
   * Create a simple plugin for a single chat command
   * @param {string} name - the chat command's name
   * @param {Function} command - the chat command's function
   * @param {string} [helpText] - the help text for the chat command
   * @returns {Plugin}
   */
  simplePlugin: (name, command, helpText) => {
    return new Plugin(name, [new Command(name, command, helpText)]);
  }
};