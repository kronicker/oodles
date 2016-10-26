'use strict';

// const Boom = require('boom');
const Glob = require('glob');
const Path = require('path');
const sessionAuth = require('../auth');

function requireAll(server) {
  Glob.sync('./server/routes/!(index.js)').forEach(file => {
    let routes = require(Path.resolve(file));
    for(let route of routes) {
      route.config.handler = errorHandler(route.config.handler);
      server.route(route);
    }
  });
}

function errorHandler(defaultHandler) {
  return function(request, reply) {
    return defaultHandler(request, reply);
    //TODO Implement me, I dont work!
    //   .catch(err => {
    //   console.log('entered');
    //   console.log(err);
    //   reply(Boom.wrap(err));
    // });
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
