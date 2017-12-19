// Supported config options
// {
//   rollbar: { .. startup options to pass to rollbar .. }
// }
const Rollbar = require('rollbar');
const api = require('../api');
let rollbar = null;

let rollbarEnabled = false;

const init = (config) => {
  if(config.rollbar){
    try{
      rollbar = new Rollbar(config.rollbar);
      rollbarEnabled = true;
    } catch(err) {
      console.error('[rollbar] error while configuring plugin', err);
    }
  } else {
    console.info('[rollbar] error handler disabled.');
  }
};

const rollbarErrorHandler = (err) => {
  if(rollbarEnabled){
    rollbar.error(err);
  }
};

const events = {};
events[api.events.ERROR] = rollbarErrorHandler;

module.exports = new api.Plugin('rollbar', [], events, init);