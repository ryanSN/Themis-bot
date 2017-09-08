const Command = require('./Command');
const Plugin = require('./Plugin');
const KNOWN_EVENTS = require('./events');

/** @module themis/api */
exports.Command = Command;
exports.Plugin = Plugin;
exports.events = KNOWN_EVENTS;
/** Utility functions to assist defining a plugin */
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