const api = require('../api');
const RollDice = require('rolldice');

/**
 * Command handler to roll dice
 * @param {*} bot 
 * @param {*} msg 
 * @param {string} suffix 
 */
const roll = (bot, msg, suffix) => {

  const detailedResults = suffix.toLowerCase().indexOf('detailed') === 0;
  if(detailedResults){
    suffix = suffix.substr(8);
  }

  if(!suffix.trim()){
    suffix = '2d6';
  }

  const rollResult = new RollDice(suffix, { detailed: detailedResults });
  msg.reply(rollResult.toString(), { split: { append: '...' }});
};

const helpText = 'Roll some dice. To see syntax, enter !roll help or !roll syntax';
const rollAliases = ['roll', 'r'];
const commands = rollAliases.map(name => new api.Command(name, roll, helpText));

module.exports = new api.Plugin('roll', commands);