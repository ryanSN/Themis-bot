const api = require('../api');

let quiet = false;
const ready = () => {
  if(!quiet){
    console.info('[Ready] Bot is now ready!');
  }
};

const join = evt => {
  if(!quiet){
    console.info(`[Join] Joined server "${evt.name}".`);
  }
};

const reconnecting = () => {
  if(!quiet){
    console.info('[Reconnecting] Attempting to reconnect to Discord...');
  }
};

const disconnectHandler = evt => {
  if(!quiet){
    console.info(`[Disconnected] Clean: ${evt.wasClean} Code ${evt.code}; Reason: ${evt.reason}`);
  }
};

const errorHandler = err => {
  if(!quiet){
    console.error('[ERROR]', err);
  }
};

const initialized = (config) => {
  quiet = !!config.public.quiet;
  if(!quiet){
    console.log('[ConsoleReporter] Initialized');
  }
};

const events = {};
events[api.events.READY] = ready;
events[api.events.ERROR] = errorHandler;
events[api.events.DISCONNECTED] = disconnectHandler;
events[api.events.RECONNECTED] = reconnecting;
events[api.events.JOIN_SERVER] = join;

module.exports = new api.Plugin('consoleReporter', [], events, initialized);