const rollbar = require('rollbar');

let rollbarEnabled = false;

const init = (config) => {
  if(config && config.key){
    rollbar.init(config.key);
    rollbar.handleUncaughtExceptions(config.key, config.options || { exitOnUncaughtException: true });
    rollbarEnabled = true;
  } else {
    console.warn('No rollbar config found. Rollbar error handler disabled.');
  }
};

const rollbarErrorHandler = (err) => {
  if(rollbarEnabled){
    rollbar.log(err);
  }
};

module.exports = (Plugin) => {
  return new Plugin('rollbar', [], { error: rollbarErrorHandler }, init);
};