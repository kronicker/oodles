const boom = require('boom');
const Glob = require('glob');
const Path = require('path');

function errorHandler(defaultHandler) {
  return (request, reply) => {
    return defaultHandler(request, reply).catch(err => reply(boom.wrap(err)));
  };
}

module.exports = server => {
  Glob.sync('./server/routes/!(index.js)').forEach(file => {
    require(Path.resolve(file))(server, errorHandler);
  });
};
