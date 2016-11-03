'use strict';
const boom = require('boom');
const glob = require('glob');
const path = require('path');
const sessionAuth = require('../auth');

function requireAll(server) {
  glob.sync('./server/routes/!(index.js)').forEach(file => {
    let routes = require(path.resolve(file));

    for(let route of routes) {
      route.config.handler = errorHandler(route.config.handler);
      server.route(route);
    }
  });
}

function errorHandler(defaultHandler) {
  return (request, reply) => {
    Promise.resolve(defaultHandler(request, reply))
      .catch(err => {
        if(!err.isBoom) { boom.wrap(err); }

        reply(err.message).code(err.output.statusCode);
      });
    };
}

let routes = {
  register: (server, options, next) => {
    server.register(sessionAuth, err => {
      if (err) throw err;

      requireAll(server);
    });
    next();
  }
};

routes.register.attributes = {
  name: 'routes'
};

module.exports = routes;
