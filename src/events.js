/**
 * The events handled by Themis
 * @private
 */
const events = {
  /**
   * The bot is ready to service requests
   * @type {string}
   * @memberof module:themis/api.events
   */
  READY: 'ready',
  /**
   * An error was encountered on the connection level
   * @type {string}
   * @memberof module:themis/api.events
   */
  ERROR: 'error',
  /**
   * The connection to Discord was lost
   * @type {string}
   * @memberof module:themis/api.events
   */
  DISCONNECTED: 'disconnect',
  /**
   * The client is attempting to reestablish connections to the discord network
   * @type {string}
   * @memberof module:themis/api.events
   */
  RECONNECTED: 'reconnecting',
  /**
   * The bot joined a server
   * @type {string}
   * @memberof module:themis/api.events
   */
  JOIN_SERVER: 'guildCreate'
};

module.exports = Object.freeze(events);