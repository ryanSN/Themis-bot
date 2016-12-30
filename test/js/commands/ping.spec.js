const chai = require('chai');
const ping = require('../../../src/commands/info/ping');

chai.should();

describe('ping', () => {
  it('should return pong', () => {
    const message = {
      mentions: {
        content: 'ping'
      }
    };
  });
});
