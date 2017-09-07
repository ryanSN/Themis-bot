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
  if(config && config.hasOwnProperty('quiet')){
    quiet = !!config.quiet;
  }
  if(!quiet){
    console.log('[ConsoleReporter] Initialized');
  }
};

const events = {
  ready,
  errorHandler,
  disconnectHandler,
  reconnecting,
  join
};

module.exports = (Plugin) => {
  return new Plugin('consoleReporter', [], events, initialized);
};