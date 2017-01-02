const chai   = require('chai');
chai.should();
const expect = chai.expect;

describe('Smoke test Test Framework', () => {
  it('should do basic expect', () => {
    expect('bar').to.not.equal('foo');
  });
});
