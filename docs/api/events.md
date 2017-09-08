# Events

The events object is a read-only hash of string values. It is provided to simplify plugin development, as some of the event names exposed by discord.js are quite creative. This will also allow Themis to provide support custom events originating outside of Discord at a future time.

This data-structure is exposed on the Themis API object, available via importing `src/api.js` into your script.

```javascript
const api = require('src/api');
api.events // right here
```

> If developing a plugin, *api* is available via `require('../api')`

## Properties

### DISCONNECTED [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=disconnect)

string - the bot was disconnected from Discord for some reason

### ERROR [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=error)

string - the bot has encountered an error

### JOIN_SERVER [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=guildCreate)

string - the bot has joined a server

### READY [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=ready)

string - the bot is connected and ready to service requests

### RECONNECTED [Discord.js](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=reconnecting)

string - the bot has reconnected to discord
