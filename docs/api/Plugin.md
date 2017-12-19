# Plugin

Defines a Plugin for Themis. Must have a unique name among all plugins. Houses a collection of commands, events, and an optional initialization callback.

This class is exposed on the Themis API object, available via importing `src/api.js` into your script.

```javascript
const api = require('src/api');
api.Plugin // right here
```

> If developing a plugin, *api* is available via `require('../api')`

## Plugin constructor

```javascript
new Plugin(pluginName, commands, events, initCallback)
```

- pluginName (string) - the name of your plugin, must be unique, *required*
- commands (Command[]) - the plugin's exposed [Command](Command.md) objects, *optional*
- events (Object.<string, Function>) - an object hash of [event strings](events.md) to event handler callbacks, *optional*
- initCallback (Function) - a callback accepting a single `config` object argument, *optional*

### Event Callbacks

```javascript
const someEvent = (evt) => {
  //handle the event in some useful way
}
```

The event callback hash object exposes event handlers attached to string keys. These handlers are attached directly to the Discord.js client's EventEmitter after the bot's client has connected to discord for the first time. The value of the `evt` argument is entirely based upon the type of event being handled.

### Initialization Callback

```javascript
const initCallback = (config) => {
  config.public // any public properties
  config.myPluginName // any plugin-specific config values
}
```

The initialization callback is only called once all plugin scripts have been loaded & validated. The config object will always be provided, and it will always have a `public` property, and a property which matches your plugin's name.

## Properties

### name

string - the plugin's name

### commands

Command[] - the plugin's commands

### events

Object.<string, Function> - events this plugin listens for

### init

InitializationCallback - the function executed when the bot has finished loading plugins