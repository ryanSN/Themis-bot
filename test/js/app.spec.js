const app     = require('../../src/app');
const chai    = require('chai');
const sinon   = require('sinon');
const Discord = require('discord.js');
const config  = require('../../config/config.test');
const P       = require('bluebird');
const EventEmitter = require('events').EventEmitter;

chai.should();

const bot = new Discord.Client();

describe('login process', () => {
  beforeEach(() => {
    sinon.stub(bot, 'login').withArgs(config.token)
      .returns(P.resolve(['message']));
  });

  afterEach(() => {
    bot.login.restore();
  });

  it('should call login', (done) => {
    app.start(bot, {});
    bot.login.calledOnce.should.be.true;
    done();
  });

  it('should call message', (done) => {
    const Message = {
      content: 'test'
    };
    const eventStub = sinon.stub(bot, 'on');
    bot.on('message', Message);
    eventStub.calledOnce;
    done();
  });
});
