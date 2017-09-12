// Supported config options
// {
//   uptime: {
//     format: 'fancy' - Either 'fancy' or 'simple' for text or numeric output
//   }
// }
const api = require('../api');
let startupTime = new Date().getTime();
let connectionTime = startupTime;
let fancyOutput = true;

/**
 * Gets the plural or singular form
 * @private
 * @param {number} value 
 * @param {string} singular 
 * @param {string} plural 
 * @returns {string}
 */
const pluralize = (value, singular, plural) => {
  return value === 1 ? singular : plural;
};

/**
 * An object detailing how much time has passed
 * @typedef TimeInterval
 * @private
 * @prop {number} milliseconds
 * @prop {number} seconds
 * @prop {number} minutes
 * @prop {number} hours
 * @prop {number} days
 */

/**
 * Get the amount of time since the provided timestamp
 * @private
 * @param {number} timestamp
 * @returns {TimeInterval}
 */
const since = (timestamp) => {
  let now = new Date().getTime();
  let diff = now - timestamp;

  let milliseconds = diff % 1000;
  let totalSeconds = Math.floor(diff / 1000);
  let significantSeconds = totalSeconds % 60;
  let totalMinutes = totalSeconds ? Math.floor(totalSeconds / 60) : 0;
  let significantMinutes = totalMinutes % 60;
  let totalHours = totalMinutes ? Math.floor(totalMinutes / 60) : 0;
  let significantHours = totalHours % 24;
  let totalDays = totalHours ? Math.floor(totalHours / 24) : 0;

  return {
    milliseconds: milliseconds,
    seconds: significantSeconds,
    minutes: significantMinutes,
    hours: significantHours,
    days: totalDays
  };
};

/**
 * Pad a number with leading zeroes
 * @private
 * @param {number} num - the  number to pad
 * @param {number} [amt] - the amount of zeroes needed, default 2
 * @returns {string}
 */
const pad = (num, amt) => {
  let x = ('' + num).split('');
  while(x.length < (amt || 2)) x.unshift('0');
  return x.join('');
};

/**
 * Get a simple string showing how much time has passed
 * @private
 * @param {TimeInterval} elapsedTime 
 */
const getSimpleTime = (elapsedTime) => {
  return `${elapsedTime.days}:${pad(elapsedTime.hours)}:${pad(elapsedTime.minutes)}:${pad(elapsedTime.seconds)}.${pad(elapsedTime.milliseconds, 4)}`;
};

/**
 * Get a nice english string showing how much time has passed
 * @private
 * @param {TimeInterval} elapsedTime 
 */
const getFancyTime = (elapsedTime) => {
  let daysLabel = pluralize(elapsedTime.days, 'day', 'days');
  let hoursLabel = pluralize(elapsedTime.hours, 'hour', 'hours');
  let minutesLabel = pluralize(elapsedTime.minutes, 'minute', 'minutes');
  let secondsLabel = pluralize(elapsedTime.seconds, 'second', 'seconds');

  if(elapsedTime.days){
    return `${elapsedTime.days} ${daysLabel}, ${elapsedTime.hours} ${hoursLabel}, ${elapsedTime.minutes} ${minutesLabel}`;
  }
  if(elapsedTime.hours){
    return `${elapsedTime.hours} ${hoursLabel}, ${elapsedTime.minutes} ${minutesLabel}`;
  }
  if(elapsedTime.minutes){
    return `${elapsedTime.minutes} ${minutesLabel}, ${elapsedTime.seconds} ${secondsLabel}`;
  }
  if(elapsedTime.seconds){
    return `${elapsedTime.seconds} ${secondsLabel} and ${elapsedTime.milliseconds} ${pluralize(elapsedTime.milliseconds, 'millisecond', 'milliseconds')}`;
  }
  return '..realistically an infinite amount of time..';
};

/**
 * Return a string representation of the time since the specified timestamp
 * @private
 * @param {number} timestamp 
 * @returns {string}
 */
const getTimeSince = (timestamp) => {
  let elapsedTime = since(timestamp);
  if(fancyOutput){
    return getFancyTime(elapsedTime);
  } else {
    return getSimpleTime(elapsedTime);
  }
};

const uptimeRequest = (client, msg) => {
  msg.reply(`I've been running for ${getTimeSince(startupTime)} and online for ${getTimeSince(connectionTime)}.`);
};

const onReconnect = () => {
  connectionTime = new Date().getTime();
};

const init = (config) => {
  if(config.uptime && config.uptime.hasOwnProperty('format')){
    fancyOutput = config.uptime.format === 'fancy';
  }
  console.log('Initializing uptime plugin, fancy output:', fancyOutput);
};

let uptimeCommand = new api.Command('uptime', uptimeRequest, 'Displays the bot\'s current uptime');
let events = {};
events[api.events.RECONNECTED] = onReconnect;

module.exports = new api.Plugin(
  'uptime',
  [uptimeCommand],
  events,
  init
);