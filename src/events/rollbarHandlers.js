const rollbar = require('rollbar');

let rollbarEnabled = false;

const init = (config) => {
  if(config.rollbar && config.rollbar.key){
    rollbar.init(config.rollbar.key);
    rollbar.handleUncaughtExceptions(config.rollbar.key, config.rollbar.options || { exitOnUncaughtException: true });
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

exports.init = init;
exports.error = rollbarErrorHandler;