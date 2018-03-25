const api = require('../api');
const RollDice = require('rolldice');

/**
 * Handle rolling dice
 * @param {string} input
 * @param {boolean} isDetailed
 */
const roll = (input, isDetailed) => {
  if (!input.trim()) {
    input = '2d6';
  }
  //check for multiple inputs
  if (input.indexOf('|') >= 0) {
    return input
      .split('|')
      .filter(x => x.trim())
      .map((x, idx) => `${idx + 1}: ` + new RollDice(x, { detailed: isDetailed }).toString())
      .join('\r\n');
  } else {
    return new RollDice(input, { detailed: isDetailed }).toString();
  }
};

/**
 * Command handler to roll dice
 * @param {*} bot
 * @param {*} msg
 * @param {string} suffix
 */
const simpleRoll = (bot, msg, suffix) => {
  const isDetailed = suffix.toLowerCase().indexOf('detailed') === 0;
  if (isDetailed) {
    suffix = suffix.substr(8);
  }
  const result = roll(suffix, isDetailed);
  msg.reply(result, { split: { append: '...' } });
};

/**
 * Command handler to roll dice
 * @param {*} bot
 * @param {*} msg
 * @param {string} suffix
 */
const detailedRoll = (bot, msg, suffix) => {
  const isDetailed = suffix.toLowerCase().indexOf('quiet') !== 0;
  if (!isDetailed) {
    suffix = suffix.substr(6);
  }
  const result = roll(suffix, isDetailed);
  msg.reply(result, { split: { append: '...' } });
};

const commands = [
  new api.Command(
    'r',
    simpleRoll,
    'Roll some dice (simple results). Enter !r help or !r syntax to see dice rolling syntax'
  ),
  new api.Command(
    'roll',
    detailedRoll,
    'Roll some dice (detailed results). Enter !roll help or !roll syntax to see dice rolling syntax'
  )
];

module.exports = new api.Plugin('roll', commands);
