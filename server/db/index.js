const glob = require('glob');
const path = require('path');
const seedDatabase = require('./seeds.js');
const models = glob.sync('./server/models/*');

function *clearAllEntries() {
  yield* models.map(model => require(path.resolve(model)).delete().run());
}


exports.register = function (server, options, next) {

  // Only seed if explicitly stated
  if (process.env.DB_SEED === 'true') {
    seedDatabase();
  }

  // Only reset if explicitly stated
  if (process.env.DB_RESET === 'true') {

    Promise.all(clearAllEntries())
      .then(seedDatabase());
  }

  return next();
};

exports.register.attributes = {
  name: 'db'
};
