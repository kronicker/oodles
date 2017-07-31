const glob = require('glob');
const path = require('path');
const seed = require('./seed.js');

const models = glob.sync('./server/models/*');

function *clearAllEntries() {
  yield* models.map(model => require(path.resolve(model)).delete().run());
}

const flush = () => Promise.all(clearAllEntries());

const reset = () => flush().then(seed);

module.exports = { seed, flush, reset };
