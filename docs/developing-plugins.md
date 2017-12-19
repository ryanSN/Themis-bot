# Developing Themis plugins

Themis plugins currently have a rather limited scope. They can:

- listen for a few global events, such as *disconnected* or *reconnected*
- expose commands, which have a static command name, handler, and help text
- expose an initialization function, which will be passed public and plugin-specific configuration values

## The Themis api object

Plugins can access the Themis api object with a simple require statement:

``` javascript
const api = require('../api');
```

This object currently has several properties:

- `Command` - the Command constructor
- `events` - a hash of event strings which are supported by the bot
- `Plugin` - the Plugin constructor
- `util` - a place for shortcuts and other useful functionality
- `util.simplePlugin` - a function which creates a simple chat command plugin

## Creating a simple plugin

A simple chat plugin only needs to respond to chat messages, and can be achieved in a few lines of code. Utilizing the `api.util.simplePlugin` function, you can expose a single chat command that has either static or dynamic output.

``` javascript
const api = require('../api');

const helloHandler = (client, message, text) => {
  message.reply('How are you doing?');
};

module.exports = api.util.simplePlugin('hello', helloHandler, 'Say hello to all my new friends');
```

The callback for message commands has 3 arguments:

- client - the [discord.js client](https://discord.js.org/#/docs/main/stable/class/Client) connection object
- message - the [discord.js Message](https://discord.js.org/#/docs/main/stable/class/Message) object for this trigger
- text - any text of the user's message which follows the command name

When you save this script and (re)start your bot, you can send `!hello` to a chat channel or message it, and it will respond with your message. If in a chat channel, the bot will tag you, because you used the message.reply method.

### Dynamic responses

You can utilize information on the client, message, and text of the command to create dynamic responses. The message `!hello it is a fine day to die` will populate the `text` argument of the above handler with 'it is a fine day to die'. You can then do any javascript logic you'd like, call imported NPM modules, or really just do whatever you'd like.

## Handling initialization and config

If you would like configuration information to be passed to your plugin at runtime, you must leave the gentle waters of `simplePlugin` and proceed outward into the lazy river of `Plugin`.

### Plugin constructor [api docs](./api/Plugin.md)

```javascript
new api.Plugin(pluginName, commands, events, initCallback)
```

- pluginName - the name of your plugin, must be unique,required
- commands - an array of api.Command objects, optional
- events - an object hash of event strings to event handler callbacks, optional
- initCallback - a function accepting a single `config` object argument

initCallback is our goal here. It's a simple, 1 argument function which is called after all plugins have been loaded onto the bot. The config object provided will have 2 properties: `public` and one matching your plugin's name. All values come directly from `/config/config.js`.

```javascript
const init = (config) => {
  // public configuration can be read by any plugin
  if(config.public.quiet){
    console.log('...Getting ready to say hi to everybody I meet...');
  } else {
    console.log('...GETTING READY TO SAY HI TO EVERYBODY I MEET...');
  }
  // plugin-specific config values are passed in under the same name
  // as your plugin's name
  if(config.hello.fancy){
    howFancyIsItInHere = config.hello.fancy;
  }
};
```

### Wait, what about my commands? [api docs](./api/Command.md)

Now that you're creating your `Plugin` instance manually, you need to supply some commands to make your bot say hello.

```javascript
const helpText = 'Say hello to all my new friends';
const commands = [
  new api.Command('hello', helloHandler, helpText),
  new api.Command('hi', helloHandler, helpText)
];

module.exports = new api.Plugin('hello', commands, null, init);
```

## Making plugin development eventful [api docs](./api/events.md)

Certain discord.js client events are exposed via the Themis plugin system:

* ready
* disconnected
* reconnected
* joined server
* error

Check out `src/plugins/consoleReporter.js` if you would like to see how this can be done, or check out the official discord.js documentation to see what arguments are passed for each of the events.

```javascript

const events = {};
events[api.events.JOIN_SERVER] = joinServerCallback;
events[api.events.RECONNECTED] = reconnectedCallback;

module.exports = new api.Plugin(pluginName, commands, events, init);
```