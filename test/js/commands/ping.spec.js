const chai = require('chai');
chai.should();
const expect = chai.expect;
const ping = require('../../../src/plugins/ping');

chai.should();

describe('ping', () => {
  it('should have one command', () => {
    expect(ping.commands).to.have.length(1);
  });

  it('should return pong', () => {  
    const message = {
      mentions: {
        content: 'ping'
      },
      reply: (str, garbo) => {
        expect(str).to.equal('pong');
        expect(garbo).to.be.undefined;
      }
    };
    expect(() => {
      ping.commands[0].command(null, message);
    }).to.not.throw();
  });
});