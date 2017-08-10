const fs = require('fs');
const path = require('path');
const Robot = require('./Robot');

/**
 * Scan the plugins config, requiring and executing plugins as specified.
 * Plugin functions are passed an instance of Robot, allowing them to configure
 * their functions as needed.
 * @param {Object} config - the application config to be given to the Robot instance
 * @returns {Robot} - a configured robot instance
 */
let readPlugins = config => {
  let robot = new Robot(config);

  //figure out the basic location for plugins config
  let rootPath = __dirname;

  let configBasePath = path.resolve(rootPath, '../config');
  let pluginConfigFile = path.join(configBasePath, 'plugins.json');

  //attempt to get plugins config location from config file
  if(config.plugins){
    let tmpPath = path.join(configBasePath, config.plugins);
    if(fs.existsSync(tmpPath)){
      pluginConfigFile = tmpPath;
    }
  }

  //make sure the config file exists
  if(fs.existsSync(pluginConfigFile)){
    console.info('Plugin config file', pluginConfigFile);
    let pluginDefinitions = require(pluginConfigFile);

    pluginDefinitions.forEach(pluginDef => {

      // require type declaration
      if(pluginDef.require){
        let fn = require(path.join(rootPath, pluginDef.require));
        if(fn instanceof Function){
          fn(robot);
        } else {
          throw new Error(`The specified plugin reference '${pluginDef.require}' did not return a function.`);
        }
      }
      
      // function type declaration
      if(pluginDef.fn){
        let fn = eval(`(${pluginDef.fn})`);
        if(fn instanceof Function){
          fn(robot);
        } else {
          throw new Error(`The evaluated plugin definition did not produce a function: ${pluginDef.fn}`);
        }
      }
    });
  } else {
    throw new Error('Fuck');
    console.warn('No config/plugins.json file found.');
  }
  return robot;
};


module.exports = readPlugins;