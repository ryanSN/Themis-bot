const rollbar = require('rollbar');
const config = require('../config/config');
const app = require('./app');

rollbar.init(config.rollbar);

app.start(rollbar);

var options = {
  exitOnUncaughtException: true
};
rollbar.handleUncaughtExceptions(config.rollbar, options);
