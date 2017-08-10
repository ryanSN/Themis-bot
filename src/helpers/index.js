const fs = require('fs');
const path = require('path');
// TODO: helper stuffs
const helper = () => {
};

function resolvePath() {
  return path.resolve.apply(path, arguments);
}

const scanDirectory = (directoryPath) => {
  directoryPath = path.resolve(directoryPath);
  return fs.readdirSync(directoryPath)
    .map(fname => {
      return path.join(directoryPath, fname);
    });
};

const requireAll = (directoryPath, validate) => {
  if(!validate || !(validate instanceof Function)){
    validate = x => !!x;
  }

  return scanDirectory(directoryPath)
    .map(filename => {
      let ext = (path.extname(filename) || '').toLowerCase();
      if(ext === '.js' || ext === '.json'){
        return require(filename);
      } else {
        return null;
      }
    })
    .filter(validate);
};

const loadCommands = (commandDirectory) => {
  return requireAll(commandDirectory, x => x && typeof x.name === 'string' && x.name.trim() && x.cmd instanceof Function)
    .reduce((commands, plugin) => {
      let lcName = plugin.name.toLowerCase();
      if(!commands.hasOwnProperty(lcName)){
        commands[lcName] = plugin.cmd;
      } else {
        console.warn(`Command handler already registered for ${plugin.name}`);
      }
      return commands;
    }, {});
};

const KNOWN_EVENTS = [
  'ready',
  'error',
  'disconnect',
  'reconnecting',
  'guildCreate'
];

const loadEvents = (client, eventsDirectory) => {
  requireAll(eventsDirectory)
    .forEach(handlers => {
      KNOWN_EVENTS.forEach(evt => {
        if(handlers[evt] instanceof Function){
          client.on(evt, handlers[evt]);
        }
      });
    });
};

module.exports = {
  helper,
  resolvePath,
  scanDirectory,
  requireAll,
  loadCommands,
  loadEvents
};