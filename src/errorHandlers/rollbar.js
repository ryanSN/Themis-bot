const rollbar = require('rollbar');
const register = robot => {
  if(robot.config.rollbar && robot.config.rollbar.key){
    rollbar.init(robot.config.rollbar.key);
    rollbar.handleUncaughtExceptions(robot.config.rollbar.key, robot.config.rollbar.options || {exitOnUncaughtException: true});

    robot.addErrorHandler(err => {
      rollbar.log(err);
    });
  } else {
    console.warn('No rollbar config found. Rollbar error handler disabled.');
  }
};

module.exports = register;