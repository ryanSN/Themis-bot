const chai    = require('chai');
const ping    = require('../../../src/commands/info/ping');
const Discord = require('discord.js');
const bot     = new Discord.Client();

chai.should();

const reply = (msg) => msg;

describe('ping', () => {
  it('should return pong', (done) => {
    const Message = {
      content: '!ping',
      reply: reply
    };
    ping(bot, Message).should.equal('pong');
    done();
  });
});
