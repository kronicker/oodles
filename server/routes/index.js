const Boom = require('boom');
const Glob = require('glob');
const Path = require('path');

function errorHandler(defaultHandler) {
  return function(request, reply) {
    return defaultHandler(request, reply).catch(err => {
      console.log(err);
      reply(Boom.wrap(err));
    });
  };
}

module.exports = server => {
  Glob.sync('./server/routes/!(index.js)').forEach(file => {
    require(Path.resolve(file))(server, errorHandler);
  });
};
