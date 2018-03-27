[![CircleCI](https://circleci.com/gh/ryanSN/Themis-bot.svg?style=svg)](https://circleci.com/gh/ryanSN/Themis-bot)
[![Build Status](https://travis-ci.org/ryanSN/Themis-bot.svg?branch=master)](https://travis-ci.org/ryanSN/Themis-bot)
[![Coverage Status](https://coveralls.io/repos/github/ryanSN/Themis-bot/badge.svg?branch=master)](https://coveralls.io/github/ryanSN/Themis-bot?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/ryansn/themis-bot/badge.svg)](https://snyk.io/test/github/ryansn/themis-bot)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Themis

A Simple Discord chat bot using the [Discord.js](https://github.com/hydrabolt/discord.js/) API library.

## Why the name Themis?!

_Themis is an ancient Greek Titaness. She is described as "[the Lady] of good counsel", and is the personification of divine order, fairness, law, natural law, and custom. Her symbols are the Scales of Justice, tools used to remain balanced and pragmatic. Themis means "divine law" rather than human ordinance,..._ [Source](https://en.wikipedia.org/wiki/Themis)

## Getting Started

Currently, you must host the bot somewhere consistently connected to the internet. In order to get your bot up and running you'll need a set of Discord app / bot credentials. You can obtain these by logging into Discord in your browser, then going to: https://discordapp.com/developers/applications/me

You will need to make an application, then make a bot for that application. Once you make a bot for the application, you can get the necessary **token** and **client_id** to allow your bot to connect. See below for details on putting these values into the bot's configuration files. Once your bot has connected, it will print out a URL you can use to invite the bot to servers you either own or administer. If during registration you had set your Discord App to "private", only you will be able to add the bot to servers, preventing other people from using it while you develop features.

# Commands

* `!ping`
* `!uptime`
* `!roll syntax` or `!r syntax` or `!roll 1d20`...

## Local Development / installation

* install [node.js]
* Run `yarn`
* Copy `config/config.js.example` to `config/config.js`
* Enter any relevant authentication or API keys for your bot into `config/config.js`
* Run `yarn start`

# Developing plugins

1.  Create a new javascript file under `src/plugins/`
2.  Pull in the Themis api:

```javascript
const api = require('../api');
```

3.  Export a `api.Plugin` as your module's default export:

```javascript
module.exports = new api.Plugin('myAwesomePlugin', commands, events, setupFunction);
```

If you would like your plugin to actually DO something, it should expose [some commands or listen for some events](docs/developing-plugins.md).

# Contributing

If you would like to contribute to this project, fork it, and send a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

# License

[GPL v3.0](LICENSE)
