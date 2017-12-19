# Command

Defines a chat command for Themis. A chat command consists of the trigger text, the command callback function, and some optional help text. Commands are exposed to the bot via [Plugins](./Plugin.md).

This class is exposed on the Themis API object, available via importing `src/api.js` into your script.

```javascript
const api = require('src/api');
api.Command // right here
```

> If developing a plugin, *api* is available via `require('../api')`

## Constructor

```javascript
new Command(commandName, commandCallback, helpText)
```

- commandName (string) - the command's name, which will trigger it when seen in chat, *required*
- commandCallback (Function) - the command's callback function, *required*
- helpText (string) - the optional help text that will be used to describe this command

### Command Callback function

```javascript
const myCommandCallback = (client, message, text) => {
  // ...
}
```

The command callback is fired whenever a user enters the !command into a chat which the bot can see. Commands must be entered at the start of a line, and must be prefixed with the appropriate trigger character (! by default, configured in config.js).

- client - the discord.js client for the bot
- message - the discord.js message that triggered this callback
- text - any text that may have followed !commandName followed by a single space

## Properties

### name

string - the command's name / trigger (in lower-case)

### command

Function - the Command Callback for this command

### helpText

string - the command's help text