const boom = require('boom');

function errorHandler(defaultHandler) {
  return function(request, reply) {
    return defaultHandler(request, reply).catch((err) => {
      console.log(err);
      reply(boom.wrap(err));
    });
  };
}

module.exports = (server) => {
  require('./thingy')(server, errorHandler);
  require('./oodler')(server, errorHandler);
  require('./oodlet')(server, errorHandler);
};
