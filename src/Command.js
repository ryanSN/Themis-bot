/**
 * Defines a chat command
 * @class Command
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

module.exports = Command;