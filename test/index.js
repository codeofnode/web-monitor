import assert from 'assert'
const main = require(`../${process.env.TEST_DIR||'src'}/src/index`).default

describe('test 1', () => {
  describe('simplest', () => {
    it('a check', (done) => {
      assert(typeof (new main({ urlfile: process.cwd()+'/url.json', monitor:'cmd', logdir: 'logs' })).start,'function');
      done();
    })
  });
})
