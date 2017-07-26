const boom = require('boom');
const glob = require('glob');
const path = require('path');
const sessionAuth = require('../auth');

function errorHandler(defaultHandler) {
  return (request, reply) => {
    Promise.resolve(defaultHandler(request, reply))
      .catch(err => {
        if(!err.isBoom) { boom.wrap(err); }

        reply(err.message).code(err.output.statusCode);
      });
    };
}

function requireAll(server) {
  glob.sync('./server/routes/!(index.js)').forEach(file => {
    const routes = require(path.resolve(file));

    routes.forEach(route => {
      if(!route.config.handler.directory) {
        route.config.handler = errorHandler(route.config.handler);
      }
      server.route(route);
    });
  });
}

exports.register = (server, options, next) => {
  server.register(sessionAuth, err => {
    if (err) {
      throw err;
    }

    requireAll(server);
  });
  next();
};

exports.register.attributes = {
  name: 'routes'
};
