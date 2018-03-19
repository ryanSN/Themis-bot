/**
 * A function called when your chat command is recognized in a message
 * @callback CommandCallback
 * @memberof module:themis/api
 * @param {*} client - the {@link https://discord.js.org/#/docs/main/stable/class/Client discord.js client} connection object
 * @param {*} message - the {@link https://discord.js.org/#/docs/main/stable/class/Message discord.js message} object
 * @param {string} text - any text following your command's name and an obligatory space
 */

/**
 * Defines a chat command
 */
class Command{
  /**
   * Create a new command definition
   * @param {string} name - the name of the command
   * @param {module:themis/api.CommandCallback} command - the function that handles the command's message
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
    /**
     * The name of this command, and the trigger text to search for in chat
     * @type {string}
     */
    this.name = name.toLowerCase();
    /**
     * The callback command to execute when the command's name is found
     * @type {module:themis/api.CommandCallback}
     */
    this.command = command;
    /**
     * The command's help text
     * @type {string}
     */
    this.helpText = helpText;
  }
}

module.exports = Command;
