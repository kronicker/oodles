'use strict';

const Boom = require('boom');
const Glob = require('glob');
const Path = require('path');

function requireAll(server) {
  Glob.sync('./server/routes/!(index.js)').forEach(file => {
    require(Path.resolve(file))(server, errorHandler);
  });
}

function errorHandler(defaultHandler) {
  return function(request, reply) {
    return defaultHandler(request, reply).catch(err => {
      console.log(err);
      reply(Boom.wrap(err));
    });
  };
}

let routes = {
  register: (server, options, next) => {
    requireAll(server);
    next();
  }
};

routes.register.attributes = {
  name: 'routes'
};

module.exports = routes;
