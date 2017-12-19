/**
 * Supported events that plugins may process
 */
const KNOWN_EVENTS = Object.freeze({
  READY: 'ready',
  ERROR: 'error',
  DISCONNECTED: 'disconnect',
  RECONNECTED: 'reconnecting',
  JOIN_SERVER: 'guildCreate'
});

module.exports = KNOWN_EVENTS;