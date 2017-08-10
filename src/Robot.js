/**
 * @callback commandCallback
 * @param {Object} bot - the discord.js client
 * @param {Object} message - the discord.js message that triggered the command
 * @param {string} commandArguments - the text following the command
 */

/**
 * Represents some configuration for the bot, such as error handlers and command functions
 */
class Robot{
  constructor(config){
    /**
     * @member {Object.<string, Function>} commands - the hash of commands that are defined on the robot
     */
    this.commands = {};
    /**
     * @member {Function[]} errorHandlers - the array of error handlers
     */
    this.errorHandlers = [];
    /**
     * @member {Object} config - the robot configuration object from config/config.js
     */
    this.config = config || {};
  }

  /**
   * Add a new error handler to the bot
   * @param {Function} errorHandler - a function that will log or deal with any errors in the bot.
   */
  addErrorHandler(errorHandler){
    if(errorHandler instanceof Function){
      this.errorHandlers.push(errorHandler);
    }
  }

  /**
   * Registers a chat command
   * @param {string} commandName - the command name to register
   * @param {commandCallback} commandFunction - the function to register for this command
   */
  addCommand(commandName, commandFunction){
    if(typeof commandName  === 'string' && commandFunction instanceof Function){
      let commandLc = commandName.trim().toLowerCase();
      if(commandLc) {
        if(!this.commands.hasOwnProperty(commandLc)){
          this.commands[commandLc] = commandFunction;
        } else {
          throw new Error(`Command already exists: ${commandLc}`);
        }
      } else {
        throw new Error('You must specify a commandName.');
      }
    } else {
      throw new Error(`Invalid command configuration; commandName:${commandName}`);
    }
  }
}

module.exports = Robot;