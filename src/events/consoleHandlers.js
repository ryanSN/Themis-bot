const ready = () => {
  console.info('[Ready] Bot is now ready!');
};

const join = evt => {
  console.info(`[Join] Joined server "${evt.name}".`);
};

const reconnecting = () => {
  console.info('[Reconnecting] Attempting to reconnect to Discord...');
};

const disconnectHandler = evt => {
  console.info(`[Disconnected] Clean: ${evt.wasClean} Code ${evt.code}; Reason: ${evt.reason}`);
};

const errorHandler = err => {
  console.error('[ERROR]', err);
};

exports.ready = ready;
exports.error = errorHandler;
exports.disconnect = disconnectHandler;
exports.reconnecting = reconnecting;
exports.guildCreate = join;